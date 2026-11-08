import { expect, test } from "@playwright/test"

test("color input updates the color wheel and follows its changes", async ({
  page,
}) => {
  await page.goto("/")
  const input = page.getByRole("combobox", { name: "Color", exact: true })
  const wheel = page.locator("reinvented-color-wheel")
  await expect(input).toHaveValue("#FF0000")
  await expect(wheel).toHaveAttribute("hex", "#ff0000")
  await input.fill("#412073")
  await input.press("Enter")
  await expect(wheel).toHaveAttribute("hex", "#412073")
  await wheel.evaluate((element) => {
    ;(element as HTMLElement & { colorWheel: { hex: string } }).colorWheel.hex =
      "#00ff00"
  })
  await expect(input).toHaveValue("#00FF00")

  const before = await input.boundingBox()
  await page.mouse.move(before!.x + 10, before!.y + 10)
  await page.mouse.down()
  await page.mouse.move(before!.x + 60, before!.y + 20, { steps: 5 })
  await page.mouse.up()
  const after = await input.boundingBox()
  expect(after!.x).toBeCloseTo(before!.x, 0)
  expect(after!.y).toBeCloseTo(before!.y, 0)
})
