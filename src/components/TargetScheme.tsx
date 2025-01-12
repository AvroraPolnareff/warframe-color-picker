import React, {ReactNode, useContext, useEffect, useMemo, useRef, useState} from "react";
import styled, {css, useTheme} from "styled-components";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";
import {Switch} from "./shared/Switch";
import _, { iteratee } from "lodash";
import {Trans, useTranslation} from "react-i18next";
import {createMachine} from "xstate";
import {useMachine} from "@xstate/react";
import {Input} from "./shared/Input";
import {Box, color} from "@mui/system";
import {UrlPaletteContext} from "../providers/UrlColorsProvider";
import {colorsFromImage, findClosestColors, shortenText} from "../common/helpers";
import {Link} from "./shared/Link";
import { palettes } from "src/common/palettes";
import { TFunction } from "i18next";

interface TargetSchemeProps {
  paletteColors: string[]
  onCellClick: (colorPosition: number, e: React.MouseEvent) => void;
  onImportClick: (colors: string[]) => void;
}

type WindowMachineEvents =
  | { type: "TOGGLE" }
  | { type: "EXPORT" }
  | { type: "IMPORT" }
  | { type: "BACK" }
  | { type: "TEXT" }

const windowMachine = createMachine({
  id: "window",
  initial: "colorWindows",
  tsTypes: {} as import("./TargetScheme.typegen").Typegen0,
  schema: {
    events: {} as WindowMachineEvents,
  },
  states: {
    colorWindows: {
      initial: "default",
      on: {
        EXPORT: {target: "sharing.export"},
        IMPORT: {target: "sharing.import"},
        TEXT: {target: "sharing.text"}
      },
      states: {
        default: {
          on: {
            TOGGLE: {target: "manual"}
          }
        },
        manual: {
          on: {
            TOGGLE: {target: "default"}
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
        BACK: {target: "#window.colorWindows.hist"}
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
    onImportClick
  }: TargetSchemeProps
) => {
  const {t} = useTranslation()
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
        send("BACK")
      }
      img.src = ev.target.result as string

      if (!inputRef.current) return;
      inputRef.current.value = ""
    })
    reader.readAsDataURL(file)
  }

  return (
    <Window width={14.321} style={{zIndex: 0}} height={17.8}>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%" width="100%">
        <Box>
          <FlexColumnCenter>
            <Header>{t("colorPicker.targetScheme.targetScheme")}</Header>
            {current.matches("colorWindows") && <>
                <Box pb="0.3em">
                    <Switch
                        switched={current.matches("colorWindows.manual")}
                        width={11.13}
                        onClick={() => send("TOGGLE")}
                        leftText={t("colorPicker.targetScheme.default")}
                        rightText={t("colorPicker.targetScheme.manual")}
                    />
                </Box>
                <Divider/>
            </>}
          </FlexColumnCenter>
          {current.matches("colorWindows.manual") &&
              <Manual colors={paletteColors} onCellChange={onCellChange} selectedCell={selectedCell}/>
          }
          {current.matches("colorWindows.default") &&
              <Default
                  colors={paletteColors.slice(Math.floor(selectedCell / 8) * 8, Math.floor(selectedCell / 8 + 1) * 8)}
                  onCellChange={(index, e) => onCellChange(index + Math.floor(selectedCell / 8) * 8, e)}
                  selectedCell={selectedCell % 8}
              />
          }
          {current.matches("sharing.import") &&
              <Import onImport={(colors) => {
                onImportClick(colors);
                send("BACK")
              }}/>
          }
          {current.matches("sharing.export") &&
              <Export colors={paletteColors}/>
          }
          {current.matches("sharing.text") &&
              <TextExport colors={paletteColors.slice(Math.floor(selectedCell / 8) * 8, Math.floor(selectedCell / 8 + 1) * 8)}/>
          }
        </Box>
        <Box height={"2.1em"}>
          <Divider/>
          <input
            ref={inputRef}
            type="file"
            style={{position: "fixed", top: -100}}
            onChange={onScreenshotImportChange}
            name="screenshot" id="screenshot"
          />
          <Box
            display="inline-flex"
            width="100%"
            justifyContent="space-between"
            gap="0.4em"
            margin="0.2em auto"
          >
            {current.can("TEXT") &&
              <Button
                round
                small
                fullWidth
                onClick={() => send("TEXT")}
              >
                {t("colorPicker.targetScheme.text")}
              </Button>
            }
            {current.can("EXPORT") &&
              <Button
                round small fullWidth
                onClick={() => send("EXPORT")}
              >
                {t("colorPicker.targetScheme.export")}
              </Button>
            }
            {current.can("IMPORT") &&
              <Button
                round
                small
                fullWidth
                onClick={() => send("IMPORT")}
              >
                {t("colorPicker.targetScheme.import")}
              </Button>
            }
            {current.can("BACK") &&
              <Button
                round
                small
                onClick={() => send("BACK")}
              >
                {t("colorPicker.targetScheme.back")}
              </Button>
            }
            {current.matches("sharing.import") &&
              <Button
                round small
                htmlFor="screenshot"
                as="label"
              >
                {t("colorPicker.targetScheme.manualUpload")}
              </Button>
            }

          </Box>
        </Box>
      </Box>
    </Window>
  )
}

const Header = styled.h2`
  font-weight: 900;
  color: ${props => props.theme.colors.targetSchemeHeader};
  margin-bottom: 0.12em;
  margin-top: 0;
  font-size: 1.6rem;
  pointer-events: none;
  user-select: none;
`

interface DefaultProps {
  colors: string[],
  onCellChange: (colorIndex: number, e: React.MouseEvent) => void,
  selectedCell: number
}

const Default = (
  {
    colors,
    onCellChange,
    selectedCell
  }: DefaultProps
) => {
  const {t} = useTranslation()

  const isSelected = (number: number) => selectedCell === number;

  const onCellClick = (index: number, e: React.MouseEvent) => {
    onCellChange(index, e);
  }

  return (
    <Wrapper>
      <Box pt="0.35em">
        <ColorEntry text={t("colorPicker.targetScheme.primary")} selected={isSelected(0)}
                    onClick={(e) => onCellClick(0, e)} color={colors[0]}/>
        <ColorEntry text={t("colorPicker.targetScheme.secondary")} selected={isSelected(1)}
                    onClick={(e) => onCellClick(1, e)} color={colors[1]}/>
        <ColorEntry text={t("colorPicker.targetScheme.tertiary")} selected={isSelected(2)}
                    onClick={(e) => onCellClick(2, e)} color={colors[2]}/>
        <ColorEntry text={t("colorPicker.targetScheme.quaternary")} selected={isSelected(3)}
                    onClick={(e) => onCellClick(3, e)} color={colors[3]}/>
        <div>
          <StyledColorEntry>
            <ColorCell outline={isSelected(4)} color={colors[4]} onClick={(e) => onCellClick(4, e)}/>
            <ColorCell outline={isSelected(5)} color={colors[5]} onClick={(e) => onCellClick(5, e)}/>
            <ColorName>{t("colorPicker.targetScheme.emissive")}</ColorName>
          </StyledColorEntry>
          <StyledColorEntry>
            <ColorCell outline={isSelected(6)} color={colors[6]} onClick={(e) => onCellClick(6, e)}/>
            <ColorCell outline={isSelected(7)} color={colors[7]} onClick={(e) => onCellClick(7, e)}/>
            <ColorName>{t("colorPicker.targetScheme.energy")}</ColorName>
          </StyledColorEntry>
        </div>
      </Box>
    </Wrapper>
  )
}

const Export = (props: { colors: string[] }) => {
  const urlColors = useContext(UrlPaletteContext)
  const value = useMemo(() => urlColors.savePalette({name: "v1", colors: props.colors}), [props.colors])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return <Box fontStyle="italic">
    <Divider/>
    <Box my="0.6em">
      <Input fullWidth placeholder="..." value={value} readOnly ref={inputRef} onClick={() => inputRef.current?.select()}/>
    </Box>
    <Divider/>
    <Box fontSize="0.82em" lineHeight={1.2} whiteSpace="pre-line" pt="0.6em">
      <Trans i18nKey={`colorPicker.targetScheme.exportDescription`}>
        Opening this link will let you choose whether you want to overwrite your current scheme.
        <br/>
        <br/>
        The link has been automatically copied to your clipboard.
      </Trans>
    </Box>
  </Box>
}

const getClosestColor = (color: string, t: TFunction<"translation", undefined>, shorten = true) => {
  if (!color) return ""
  const matchedColor = findClosestColors(color, palettes, 1)[0]
  const positionX = String.fromCharCode(97 + matchedColor.position.x).toUpperCase()
  const paletteName = t(`palettes.${matchedColor.paletteName}`)
  return `${shorten ? shortenText(paletteName, 12) : paletteName} · ${positionX}${matchedColor.position.y + 1}`
}

const slotToSlotName = (i: number, t: TFunction<"translation", undefined>) => {
  const translateString = [
    ["colorPicker.targetScheme.primary"],
    ["colorPicker.targetScheme.secondary"],
    ["colorPicker.targetScheme.tertiary"],
    ["colorPicker.targetScheme.quaternary"],
    ["colorPicker.targetScheme.emissiveText", " 1"],
    ["colorPicker.targetScheme.emissiveText", " 2"],
    ["colorPicker.targetScheme.energyText", " 1"], 
    ["colorPicker.targetScheme.energyText", " 2"], 
  ]
  return translateString[i].map(str => t(str)).join("")  
}
const TextExport = (props: {colors: string[]}) => {
  const {colors} = props
  const theme = useTheme()
  const {t} = useTranslation()
  return <Box position="relative" top="-0.2em">
    <Box fontSize="0.773rem" >
      <Divider />
      <Box color={theme.colors.exportText} onCopy={(e) => {
        e.preventDefault()
        e.clipboardData.setData("text", colors.map((color, i) => `${slotToSlotName(i, t)}: ${getClosestColor(color, t, false)}`).join("\n"))
      }}>
        <TextExportEntry>{slotToSlotName(0, t)}: <strong>{getClosestColor(colors[0], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(1, t)}: <strong>{getClosestColor(colors[1], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(2, t)}: <strong>{getClosestColor(colors[2], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(3, t)}: <strong>{getClosestColor(colors[3], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(4, t)}: <strong>{getClosestColor(colors[4], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(5, t)}: <strong>{getClosestColor(colors[5], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(6, t)}: <strong>{getClosestColor(colors[6], t)}</strong></TextExportEntry>
        <TextExportEntry>{slotToSlotName(7, t)}: <strong>{getClosestColor(colors[7], t)}</strong></TextExportEntry>
      </Box>
      <Divider />
      <Box fontStyle="italic" display="flex" flexDirection="column" gap="0.31em" mt="0.5em">
        <Trans i18nKey={"colorPicker.targetScheme.textGuide"}>
          <Box component="p" my="0">This text can either be copied or screenshotted with formatting.</Box> 
          <Box component="p" my="0">Column by letter, row by number.</Box>
        </Trans>
      </Box>
    </Box>
  </Box>
}

const TextExportEntry = styled.div`
  text-transform: uppercase;
  font-size: 0.773rem;
  line-height: 1.3;
`

const Import = (props: { onImport: (colors: string[]) => void }) => {
  const {colors} = useTheme()
  const {t} = useTranslation()

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

  return <Box fontStyle="italic">
    <Divider/>
    <Box my="0.6em">
      <Input fullWidth placeholder="..." onPaste={onPaste}/>
    </Box>
    <Divider/>
    <Box fontSize="0.82em" whiteSpace="pre-line" lineHeight={1.2} pt="0.6em">
      <Trans
        i18nKey="colorPicker.targetScheme.importDescription"
        components={[
          <></>,
          <Box
            component="a"
            color={colors.link}
            sx={{textDecoration: "none"}}
            href={t(`colorPicker.targetScheme.importGuide`)}
          />,
          <Box component="span" fontWeight="bold" />,
          <Box component="span" fontWeight="bold" />,
        ]}
      />
    </Box>
  </Box>
}

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
    const indexed = colors.map((color, index) => ({index, color}))
    return _.chunk(indexed, 8)
  }, [colors])

  const selectedRow = useMemo(() => Math.floor(selectedCell / 8), [selectedCell])

  return (
    <Wrapper>
      <StyledManual>
        {cellsRows.map((row, index) => (
          <CellsRow selected={selectedRow === index}>
            <CellsBorder selected={selectedRow === index}/>
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
    </Wrapper>
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
  background-color: ${({theme}) => theme.colors.misc};
  border-radius: 3em;
  opacity: 0;
  //border-radius: 1.6em;
  transition: opacity linear 0.2s;
  ${({selected}) => selected && css`
    opacity: 1;
  `}
`

const Wrapper = styled.div`
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
      <ColorCell outline={selected} color={color} onClick={onClick}/>
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
