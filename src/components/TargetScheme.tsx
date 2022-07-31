import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import styled, {css, useTheme} from "styled-components";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";
import {Switch} from "./shared/Switch";
import _ from "lodash";
import {Trans, useTranslation} from "react-i18next";
import {createMachine} from "xstate";
import {useMachine} from "@xstate/react";
import {Input} from "./shared/Input";
import {Box} from "@mui/system";
import {UrlPaletteContext} from "../providers/UrlColorsProvider";
import {colorsFromImage} from "../common/helpers";
import {Link} from "./shared/Link";

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
        IMPORT: {target: "sharing.import"}
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
        import: {}
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
      img.onload = () => {onImportClick(colorsFromImage(img)); send("BACK")}
      img.src = ev.target.result as string

      if (!inputRef.current) return;
      inputRef.current.value = ""
    })
    reader.readAsDataURL(file)
  }

  return (
    <Window width={14.321} style={{zIndex: 0}}>
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
          <Import onImport={(colors) => {onImportClick(colors); send("BACK")}}/>
      }
      {current.matches("sharing.export") &&
          <Export colors={paletteColors}/>
      }
      <Divider/>
      <input
        ref={inputRef}
        type="file"
        style={{position: "fixed", top: -100}}
        onChange={onScreenshotImportChange}
        name="screenshot" id="screenshot"
      />
      <div
        style={{
          display: "inline-flex",
          width: "100%",
          justifyContent: "space-between",
          marginTop: "0.2em",
          marginBottom: "0.2em"
        }}
      >
        <span style={{flex: 1}}>
          {current.matches("sharing.import") &&
              <Button
                  round small
                  htmlFor="screenshot"
                  as="label"
              >
                {t("colorPicker.targetScheme.manualUpload")}
              </Button>
          }
        </span>
        <span>
          {current.can("IMPORT") &&
              <Button
                  round
                  small
                  onClick={() => send("IMPORT")}
                  primary
              >
                {t("colorPicker.targetScheme.import")}
              </Button>
          }
          {current.can("EXPORT") &&
              <Button
                  round small
                  onClick={() => send("EXPORT")}
                  style={{marginLeft: "0.5em"}}
              >
                {t("colorPicker.targetScheme.export")}
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
        </span>

      </div>
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
      <ColorEntry text={t("colorPicker.targetScheme.primary")} selected={isSelected(0)}
                  onClick={(e) => onCellClick(0, e)} color={colors[0]}/>
      <ColorEntry text={t("colorPicker.targetScheme.secondary")} selected={isSelected(1)}
                  onClick={(e) => onCellClick(1, e)} color={colors[1]}/>
      <ColorEntry text={t("colorPicker.targetScheme.tertiary")} selected={isSelected(2)}
                  onClick={(e) => onCellClick(2, e)} color={colors[2]}/>
      <ColorEntry text={t("colorPicker.targetScheme.quaternary")} selected={isSelected(3)}
                  onClick={(e) => onCellClick(3, e)} color={colors[3]}/>
      <div style={{marginTop: "0.65em"}}>
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
    </Wrapper>
  )
}


const ExportInputWrapper = styled.div`
  position: relative;

  height: fit-content;
  &:after {
    position: absolute;
    content: ' ';
    bottom: 0;
    left: 0;
    height: 50%;
    width: 100%;
    border-radius: 0.4em;
    ${({theme: {colors}}) => css`
      background: linear-gradient(0deg, ${colors.buttons}FF 0%, ${colors.buttons}00 100%)
    `}
  }
`

const ExportInput = styled(Input)`
  overflow: hidden;
  height: 10.5em;
  resize: none;
  font-size: 0.75em;
  padding-left: 0.45em;
`

const Export = (props: {colors: string[]}) => {
  const {t} = useTranslation()
  const urlColors = useContext(UrlPaletteContext)
  const value = useMemo(() => urlColors.savePalette({name: "v1", colors: props.colors}), [props.colors])
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return <Box height="11.575em" fontStyle="italic">
      <Divider/>
      <ExportInputWrapper>
        <ExportInput
          ref={inputRef}
          as="textarea"
          fullWidth
          placeholder="URL"
          readOnly
          value={value}
          onClick={() => inputRef.current?.select()}
        />
      </ExportInputWrapper>

      <Divider/>
      <Box fontSize="0.82em" whiteSpace="pre-line">
        {t(`colorPicker.targetScheme.exportDescription`)}
      </Box>
    </Box>
}

const Import = (props: {onImport: (colors: string[]) => void}) => {
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

  return <Box height="11.575em"  fontStyle="italic">
    <Divider/>
    <Input fullWidth placeholder="..." onPaste={onPaste} />
    <Divider/>
    <Box fontSize="0.82em" whiteSpace="pre-line" lineHeight={1.0}>
      <Trans src="colorPicker.targetScheme.importDescription">
        Insert <Box component="a" color={colors.link} sx={{textDecoration: "none"}} href={t(`colorPicker.targetScheme.importGuide`)}>your screenshot</Box> here
        via <Box component="span" fontWeight="bold">CTRL+V</Box> in this text field for it to be uploaded and recognized automatically.
        <br/><br/>
        If it doesn’t work, please use the <Box component="span" fontWeight="bold">MANUAL UPLOAD</Box> button.
        <br/><br/>
      </Trans>
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

  //display: grid;
  //grid-template-rows: repeat(6, 1fr);
  //grid-template-columns: repeat(8, 1fr);
  //row-gap: 0.15em;

`

const CellsBorder = styled.div<{ selected?: boolean }>`
  position: absolute;
  content: " ";
  left: -1.1%;
  top: -5.6%;
  width: 102.4%;
  height: 1.55em;
  border: 2px dashed transparent;
  border-radius: 1.6em;
  transition: border-color linear 0.2s;
  ${({selected, theme}) => selected && css`
    border-color: ${theme.colors.textOnBackground};
  `}
`

const Wrapper = styled.div`
  height: 9.35em;
  padding-bottom: 0.25em;
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
