import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { Window } from "./shared/Window";
import { FlexColumnCenter } from "./shared/FlexColumnCenter";
import { Button } from "./shared/Button";
import { Divider } from "./shared/Divider";
import { ColorCell } from "./shared/ColorCell";
import { Switch } from "./shared/Switch";
import _, { compact } from "lodash";
import { Trans, useTranslation } from "react-i18next";
import { setup } from "xstate";
import { useMachine } from "@xstate/react";
import { Input } from "./shared/Input";
import { UrlPaletteContext } from "../providers/UrlColorsProvider";
import { colorsFromImage, findClosestColors, shortenText } from "../common/helpers";
import { palettes } from "src/common/palettes";
import { TFunction } from "i18next";
import { MatchedColor } from "./Suggestions";
import { petColors } from "src/common/pet-colors";
import { PaletteLayout } from "src/hooks/useColorPickerLogic";

interface TargetSchemeProps {
  paletteColors: string[]
  onCellClick: (colorPosition: number, e: React.MouseEvent) => void;
  onImportClick: (colors: string[]) => void;
  paletteLayout: PaletteLayout
}

type WindowMachineEvents =
  | { type: "TOGGLE" }
  | { type: "EXPORT" }
  | { type: "IMPORT" }
  | { type: "BACK" }
  | { type: "TEXT" }

const windowMachine = setup({
  types: {
    context: {},
    events: {} as WindowMachineEvents,
  }
}).createMachine({
  id: "window",
  initial: "colorWindows",
  states: {
    colorWindows: {
      initial: "default",
      on: {
        EXPORT: { target: "sharing.export" },
        IMPORT: { target: "sharing.import" },
        TEXT: { target: "sharing.text" }
      },
      states: {
        default: {
          on: {
            TOGGLE: { target: "manual" }
          }
        },
        manual: {
          on: {
            TOGGLE: { target: "default" }
          }
        },
        hist: {
          type: "history",
          history: "shallow"
        }
      }
    },
    sharing: {
      on: {
        BACK: { target: "#window.colorWindows.hist" }
      },
      initial: "export",
      states: {
        export: {},
        import: {},
        text: {}
      },
    }
  }
})

const TargetScheme = (
  {
    paletteColors,
    onCellClick,
    onImportClick,
    paletteLayout
  }: TargetSchemeProps
) => {
  const { t } = useTranslation()
  const [selectedCell, setSelectedCell] = useState(0)

  const [current, send] = useMachine(windowMachine)

  const onCellChange = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (e.nativeEvent.button === 2) {
      onCellClick(index, e)
    } else {
      setSelectedCell(index)
      onCellClick(index, e)
    }
  }
  const inputRef = useRef<HTMLInputElement>(null);

  const onScreenshotImportChange = () => {
    if (!inputRef.current || !inputRef.current.files) return
    const file = inputRef.current?.files[0]
    if (!file) return;
    const reader = new FileReader()
    reader.onload = (ev => {
      const img = new Image()
      if (!ev.target?.result) return
      img.onload = () => {
        onImportClick(colorsFromImage(img));
        send({ type: "BACK" })
      }
      img.src = ev.target.result as string

      if (!inputRef.current) return;
      inputRef.current.value = ""
    })
    reader.readAsDataURL(file)
  }

  return (
    <Window width={14.321} style={{ zIndex: 0 }} height={17.8}>
      <Wrapper>
        <TopContent>
          <FlexColumnCenter style={{marginBottom: "-0.2em"}}>
            <Header>{t("colorPicker.targetScheme.targetScheme")}</Header>
            {current.matches("colorWindows") && <>
              <SwitchWrapper>
                <Switch
                  switched={current.matches({ colorWindows: "manual" })}
                  width={11.13}
                  onClick={() => send({ type: "TOGGLE" })}
                  leftText={t("colorPicker.targetScheme.default")}
                  rightText={t("colorPicker.targetScheme.manual")}
                />
              </SwitchWrapper>
              <Divider />
            </>}
          </FlexColumnCenter>
          {current.matches({ colorWindows: "manual" }) &&
            <Manual colors={paletteColors} onCellChange={onCellChange} selectedCell={selectedCell} />
          }
          {current.matches({ colorWindows: "default" }) &&
            <Default
              paletteLayout={paletteLayout}
              colors={paletteColors.slice(Math.floor(selectedCell / 8) * 8, Math.floor(selectedCell / 8 + 1) * 8)}
              onCellChange={(index, e) => onCellChange(index + Math.floor(selectedCell / 8) * 8, e)}
              selectedCell={selectedCell % 8}
            />
          }
          {current.matches({ sharing: "import" }) &&
            <Import onImport={(colors) => {
              onImportClick(colors);
              send({ type: "BACK" })
            }} />
          }
          {current.matches({ sharing: "export" }) &&
            <Export colors={paletteColors} />
          }
          {current.matches({ sharing: "text" }) &&
            <TextExport paletteLayout={paletteLayout} colors={paletteColors.slice(Math.floor(selectedCell / 8) * 8, Math.floor(selectedCell / 8 + 1) * 8)} />
          }
        </TopContent>
        <BottomContent>
          <Divider />
          <input
            ref={inputRef}
            type="file"
            style={{ position: "fixed", top: -100 }}
            onChange={onScreenshotImportChange}
            name="screenshot" id="screenshot"
          />
          <ButtonsWrapper>
            {current.can({ type: "TEXT" }) &&
              <Button
                round
                small
                fullWidth
                onClick={() => send({ type: "TEXT" })}
              >
                {t("colorPicker.targetScheme.text")}
              </Button>
            }
            {current.can({ type: "EXPORT" }) &&
              <Button
                round small fullWidth
                onClick={() => send({ type: "EXPORT" })}
              >
                {t("colorPicker.targetScheme.export")}
              </Button>
            }
            {current.can({ type: "IMPORT" }) &&
              <Button
                round
                small
                fullWidth
                onClick={() => send({ type: "IMPORT" })}
              >
                {t("colorPicker.targetScheme.import")}
              </Button>
            }
            {current.can({ type: "BACK" }) &&
              <Button
                round
                small
                onClick={() => send({ type: "BACK" })}
              >
                {t("colorPicker.targetScheme.back")}
              </Button>
            }
            {current.matches({ sharing: "import" }) &&
              <Button
                round small
                htmlFor="screenshot"
                as="label"
              >
                {t("colorPicker.targetScheme.manualUpload")}
              </Button>
            }

          </ButtonsWrapper>
        </BottomContent>
      </Wrapper>
    </Window>
  )
}

const ButtonsWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.4em;
  margin: 0.2em auto;
`

const BottomContent = styled.div`
  height: 2.1em;
  flex-shrink: 0;
`

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

const SwitchWrapper = styled.div`
  padding-bottom: 0.3em;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`

const Header = styled.h2`
  font-weight: 900;
  white-space: nowrap;
  color: ${props => props.theme.colors.targetSchemeHeader};
  margin-bottom: 0.12em;
  margin-top: 0;
  font-size: 1.6rem;
  pointer-events: none;
  user-select: none;
`

interface DefaultProps {
  paletteLayout: PaletteLayout
  colors: string[],
  onCellChange: (colorIndex: number, e: React.MouseEvent) => void,
  selectedCell: number
}

const Default = (
  {
    colors,
    onCellChange,
    selectedCell,
    paletteLayout
  }: DefaultProps
) => {
  const { t } = useTranslation()

  const isSelected = (number: number) => selectedCell === number;

  const onCellClick = (index: number, e: React.MouseEvent) => {
    onCellChange(index, e);
  }

  return (
    <DefaultWrapper>
      <DefaultContent>
        {paletteLayout.primary.enabled && <ColorEntry text={t("colorPicker.targetScheme.primary")} selected={isSelected(0)}
          onClick={(e) => onCellClick(0, e)} color={colors[0]} />}
        {paletteLayout.secondary.enabled && <ColorEntry text={t("colorPicker.targetScheme.secondary")} selected={isSelected(1)}
          onClick={(e) => onCellClick(1, e)} color={colors[1]} />}
        {paletteLayout.tertiary.enabled && <ColorEntry text={t("colorPicker.targetScheme.tertiary")} selected={isSelected(2)}
          onClick={(e) => onCellClick(2, e)} color={colors[2]} />}
        {paletteLayout.accents.enabled && <ColorEntry text={t("colorPicker.targetScheme.quaternary")} selected={isSelected(3)}
          onClick={(e) => onCellClick(3, e)} color={colors[3]} />}
        <div>
          {paletteLayout.emissive.enabled && <StyledColorEntry>
            <ColorCell outline={isSelected(4)} color={colors[4]} onClick={(e) => onCellClick(4, e)} />
            {paletteLayout.emissive.dual && <ColorCell outline={isSelected(5)} color={colors[5]} onClick={(e) => onCellClick(5, e)} />}
            {paletteLayout.emissive.dual && <ColorName>{t("colorPicker.targetScheme.emissive")}</ColorName>}
            {!paletteLayout.emissive.dual && <ColorName>{t("colorPicker.targetScheme.emissiveText")}</ColorName>}
          </StyledColorEntry>}
          {paletteLayout.energy.enabled && <StyledColorEntry>
            <ColorCell outline={isSelected(6)} color={colors[6]} onClick={(e) => onCellClick(6, e)} />
            {paletteLayout.energy.dual && <ColorCell outline={isSelected(7)} color={colors[7]} onClick={(e) => onCellClick(7, e)} />}
            {paletteLayout.energy.dual && <ColorName>{t("colorPicker.targetScheme.energy")}</ColorName>}
            {!paletteLayout.energy.dual && <ColorName>{t("colorPicker.targetScheme.energyText")}</ColorName>}
          </StyledColorEntry>}
        </div>
      </DefaultContent>
    </DefaultWrapper>
  )
}

const DefaultContent = styled.div`
  padding-top: 0.35em;
`

const Export = (props: { colors: string[] }) => {
  const urlColors = useContext(UrlPaletteContext)
  const value = useMemo(() => urlColors.savePalette({ name: "v1", colors: props.colors }), [props.colors])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return <ExportWrapper>
    <Divider />
    <InputWrapper>
      <Input fullWidth placeholder="..." value={value} readOnly ref={inputRef} onClick={() => inputRef.current?.select()} />
    </InputWrapper>
    <Divider />
    <DescriptionWrapper>
      <Trans i18nKey={`colorPicker.targetScheme.exportDescription`}>
        Opening this link will let you choose whether you want to overwrite your current scheme.
        <br />
        <br />
        The link has been automatically copied to your clipboard.
      </Trans>
    </DescriptionWrapper>
  </ExportWrapper>
}

const DescriptionWrapper = styled.div`
  font-size: 0.82em;
  line-height: 1.2;
  white-space: pre-line;
  padding-top: 0.6em;
`

const InputWrapper = styled.div`
  margin: 0.6em 0;
`

const ExportWrapper = styled.div`
  font-style: italic;
`

const getClosestColor = (color: string, kind: MatchedColor["kind"], t: TFunction<"translation", undefined>, shorten = true) => {
  if (!color) return ""
  switch (kind) {
    case "palette": {
      const matchedColor = findClosestColors(kind, color, palettes, 1)[0]
      if (matchedColor.kind !== "palette") throw Error("The matched color kind mistmach")
      const positionX = String.fromCharCode(97 + matchedColor.position.x).toUpperCase()
      const paletteName = t(`palette.${matchedColor.paletteName}`)
      return `${shorten ? shortenText(paletteName, 12) : paletteName} · ${positionX}${matchedColor.position.y + 1}`
    }
    case "pet": {
      const matchedColor = findClosestColors(kind, color, petColors, 1)[0]
      if (matchedColor.kind !== "pet") throw Error("The matched color kind mistmach")
      const name = t(`pet.${matchedColor.name}`)
      return `${shorten ? shortenText(name, 12) : name}`
    }
  }
}

const slotToSlotName = (i: number, paletteLayout: PaletteLayout, t: TFunction<"translation", undefined>) => {
  const translateString = compact([
    ["colorPicker.targetScheme.primary"],
    ["colorPicker.targetScheme.secondary"],
    ["colorPicker.targetScheme.tertiary"],
    ["colorPicker.targetScheme.quaternary"],
    compact(["colorPicker.targetScheme.emissiveText", paletteLayout.emissive.dual && " 1"]),
    ["colorPicker.targetScheme.emissiveText", " 2"],
    compact(["colorPicker.targetScheme.energyText", paletteLayout.energy.dual && " 1"]),
    ["colorPicker.targetScheme.energyText", " 2"],
  ])
  return translateString[i].map(str => t(str)).join("")
}
const TextExport = (props: { colors: string[], paletteLayout: PaletteLayout}) => {
  const { colors, paletteLayout } = props
  const theme = useTheme()
  const { t } = useTranslation()
  return <TextExportWrapper>
    <TextExportContent >
      <div>
        <Divider />
        <TextExportColors color={theme.colors.exportText} onCopy={(e) => {
          e.preventDefault()
          const indexToSlotName: Record<number, Exclude<keyof PaletteLayout, "id">> = {
            0: "primary",
            1: "secondary",
            2: "tertiary",
            3: "accents",
            4: "emissive",
            5: "emissive",
            6: "energy",
            7: "energy",
          }
          e.clipboardData.setData(
            "text",
            colors
              .map((color, i) => `${slotToSlotName(i, paletteLayout, t)}: ${getClosestColor(color, paletteLayout[indexToSlotName[i]].kind, t, false)}`)
              .filter((_, i) => paletteLayout[indexToSlotName[i]].enabled).join("\n")
          )
        }}>
          {paletteLayout.primary.enabled && <TextExportEntry>{slotToSlotName(0, paletteLayout, t)}: <strong>{getClosestColor(colors[0], paletteLayout.primary.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.secondary.enabled && <TextExportEntry>{slotToSlotName(1, paletteLayout, t)}: <strong>{getClosestColor(colors[1], paletteLayout.secondary.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.tertiary.enabled && <TextExportEntry>{slotToSlotName(2, paletteLayout, t)}: <strong>{getClosestColor(colors[2], paletteLayout.tertiary.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.accents.enabled && <TextExportEntry>{slotToSlotName(3, paletteLayout, t)}: <strong>{getClosestColor(colors[3], paletteLayout.accents.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.emissive.enabled && <TextExportEntry>{slotToSlotName(4, paletteLayout, t)}: <strong>{getClosestColor(colors[4], paletteLayout.emissive.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.emissive.enabled && paletteLayout.emissive.dual && <TextExportEntry>{slotToSlotName(5, paletteLayout, t)}: <strong>{getClosestColor(colors[5], paletteLayout.emissive.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.energy.enabled && <TextExportEntry>{slotToSlotName(6, paletteLayout, t)}: <strong>{getClosestColor(colors[6], paletteLayout.energy.kind, t)}</strong></TextExportEntry>}
          {paletteLayout.energy.enabled && paletteLayout.energy.dual && <TextExportEntry>{slotToSlotName(7, paletteLayout, t)}: <strong>{getClosestColor(colors[7], paletteLayout.energy.kind, t)}</strong></TextExportEntry>}
        </TextExportColors>

      </div>
      <TextExportGuide>
        <Divider style={{marginBottom: 0, marginTop: 0}}/>
        <Trans i18nKey={"colorPicker.targetScheme.textGuide"}>
          <p style={{ margin: 0 }}>Copying this text expands all shortened names.</p>
          <p style={{ margin: 0 }}>Column by letter, row by number.</p>
        </Trans>
      </TextExportGuide>
    </TextExportContent>
  </TextExportWrapper>
}

const TextExportGuide = styled.div`
  font-style: italic;
  display: flex;
  flex-direction: column;
  gap: 0.31em;
  flex-shrink: 0;
`

const TextExportColors = styled.div`
  color: ${props => props.color};
`

const TextExportContent = styled.div`
  font-size: 0.773rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5em;
  flex: 1;
  min-height: 0;
`

const TextExportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

const TextExportEntry = styled.div`
  text-transform: uppercase;
  font-size: 0.773rem;
  line-height: 1.3;
`

const Import = (props: { onImport: (colors: string[]) => void }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const onScreenshotImport = (colors: string[]) => {
    props.onImport(colors)
  }

  const onPaste = (ev: React.ClipboardEvent<HTMLInputElement>) => {
    if (!ev.clipboardData) return
    const item = ev.clipboardData.items[0]

    if (item.type.indexOf("image") === 0) {
      const blob = item.getAsFile()
      if (!blob) return;

      const reader = new FileReader()
      reader.onload = (ev => {
        const img = new Image()
        if (!ev.target?.result) return
        img.onload = () => onScreenshotImport(colorsFromImage(img))
        img.src = ev.target.result as string
      })
      reader.readAsDataURL(blob)
    }
  }

  return <ImportWrapper>
    <Divider />
    <InputWrapper>
      <Input fullWidth placeholder="..." onPaste={onPaste} />
    </InputWrapper>
    <Divider />
    <DescriptionWrapper>
      <Trans
        i18nKey="colorPicker.targetScheme.importDescription"
        components={[
          <></>,
          <Link
            style={{ color: colors.link, textDecoration: "none" }}
            href={t(`colorPicker.targetScheme.importGuide`)}
          />,
          <span style={{ fontWeight: "bold" }} />,
          <span style={{ fontWeight: "bold" }} />,
        ]}
      />
    </DescriptionWrapper>
  </ImportWrapper>
}

const Link = styled.a`
`

const ImportWrapper = styled.div`
  font-style: italic;
`

interface ManualProps {
  colors: string[],
  onCellChange: (colorIndex: number, e: React.MouseEvent) => void,
  selectedCell: number
}

const Manual = (
  {
    colors,
    onCellChange,
    selectedCell
  }: ManualProps
) => {
  const cellsRows = useMemo(() => {
    const indexed = colors.map((color, index) => ({ index, color }))
    return _.chunk(indexed, 8)
  }, [colors])

  const selectedRow = useMemo(() => Math.floor(selectedCell / 8), [selectedCell])

  return (
    <DefaultWrapper>
      <StyledManual>
        {cellsRows.map((row, index) => (
          <CellsRow selected={selectedRow === index}>
            <CellsBorder selected={selectedRow === index} />
            {row.map((cell) => (
              <ColorCell
                color={cell.color}
                outline={selectedCell === cell.index}
                onClick={(e) => onCellChange(cell.index, e)}
              />
            ))}

          </CellsRow>
        ))}
      </StyledManual>
    </DefaultWrapper>
  )
}

const StyledManual = styled.div`

  padding-top: 0.3em;

`

const CellsBorder = styled.div<{ selected?: boolean }>`
  position: absolute;
  content: " ";
  margin-left: auto;
  margin-right: auto;
  right: 0;
  text-align: center;
  left: -1.7%;
  top: -7%;
  width: 103.7%;
  height: 1.6em;
  background-color: ${({ theme }) => theme.colors.misc};
  border-radius: 3em;
  opacity: 0;
  //border-radius: 1.6em;
  transition: opacity linear 0.2s;
  ${({ selected }) => selected && css`
    opacity: 1;
  `}
`

const DefaultWrapper = styled.div`
`

const CellsRow = styled.div<{ selected?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 1.55em;
`

interface ColorEntryProps {
  text: string,
  color: string,
  selected: boolean,
  onClick: (e: React.MouseEvent) => void
}

const ColorEntry = (
  {
    text,
    color,
    selected,
    onClick
  }: ColorEntryProps
) => {
  return (
    <StyledColorEntry onClick={onClick}>
      <ColorCell outline={selected} color={color} onClick={onClick} />
      <ColorName>{text}</ColorName>
    </StyledColorEntry>
  )
}

const ColorName = styled.span`
  font-weight: normal;
  font-size: 1rem;
  letter-spacing: 0.05em;

  &:before {
    margin-right: 0.3em;
    content: "•";
    margin-left: 0.2em;
  }
`

const StyledColorEntry = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.11em;
`

export default TargetScheme
