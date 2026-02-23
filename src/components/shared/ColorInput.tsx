import React, { ReactNode, useDeferredValue, useEffect, useMemo, useState } from "react";
import Color from "color";
import styled, { css } from "styled-components";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react"
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { palettes } from "src/common/palettes";
import { ColorCell } from "./ColorCell";
import { FuzzyResult } from "@nozbe/microfuzz";
import { QuestionMarkIcon } from "src/assets/QuestionMarkIcon";
import { ExclamationMarkIcon } from "src/assets/ExclamationMarkIcon";
import { Popover } from "@base-ui/react/popover";
import { Window } from "./Window";

export type ColorMode = "hex" | "palette"

const columnMap: Record<string, number> = {
  "a": 1,
  "A": 1,
  "b": 2,
  "B": 2,
  "c": 3,
  "C": 3,
  "d": 4,
  "D": 4,
  "e": 5,
  "E": 5,
}
const reverseColumnMap: Record<number, string> = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
}

type HexInput = {
  type: "hex",
  color: string
}

type PaletteInput = {
  type: "palette"
  format: "CdRd" | "wd"
  column?: number
  row?: number
  palette?: string
}

type ParsedInput = HexInput | PaletteInput


const parseInput = (input: string): ParsedInput | undefined => {
  const partialHexRegex = input.match(/^#?([\da-f]{1,6})$/i)
  const hexRegex = input.match(/^#?([\da-f]{6})$/i)

  const paletteRegex2 = input.match(/^([a-e])(\d\d?)?(\s.*)?$/i)
  if (paletteRegex2) {
    const column = columnMap[paletteRegex2[1]] - 1
    if (column > 4 || column < 0) return
    const row = parseInt(paletteRegex2[2]) - 1
    if (row > 17 || row < 0) return
    return {
      type: "palette",
      column,
      row,
      palette: paletteRegex2[3]?.trim(),
      format: "wd"
    }
  }
  if (partialHexRegex) {
    return { type: "hex" as const, color: hexRegex?.[0] ?? "" }
  }

  const partialPaletteRegex1 = input.match(/^c(\d\d?)?r?(\d\d?)?(\s.*)?$/i)
  if (partialPaletteRegex1) {
    const column = parseInt(partialPaletteRegex1[1]) - 1
    if (column > 4 || column < 0) return
    const row = parseInt(partialPaletteRegex1[2]) - 1
    if (row > 17 || row < 0) return
    return {
      type: "palette",
      column: isNaN(column) ? undefined : column,
      row: isNaN(row) ? undefined : row,
      palette: partialPaletteRegex1[3]?.trim(),
      format: "CdRd"
    }
  }
  return
}

const parsedInputToString = (input: ParsedInput): string => {
  switch (input.type) {
    case "hex": {
      return `#${input.color}`
    }
    case "palette": {
      switch (input.format) {
        case "CdRd": {
          return `C${(input.column ?? 0) + 1}R${(input.row ?? 0) + 1} ${input.palette}`
        }
        case "wd": {
          return `${reverseColumnMap[(input.column ?? 0) + 1]}${(input.row ?? 0) + 1} ${input.palette}`
        }
      }
    }
  }
}

interface AutocompleteInputProps<Item, MappedItem> {
  onChange: (value: string) => void
  onSelect: (item: MappedItem) => void
  onEnter?: () => void
  onFocus?: () => void
  onBlur?: () => void
  value: string
  searchValue: string
  items: Item[]
  getText: (item: Item) => string[]
  mapResultItem: (item: FuzzyResult<Item>) => MappedItem
  getItemValue: (item: MappedItem) => string
  ItemRender: (item: MappedItem) => ReactNode
  valid?: boolean
  limit?: number
  compact?: boolean
}

const Autocomplete = <Item, MappedItem,>(
  props: AutocompleteInputProps<Item, MappedItem>
) => {
  const filteredList = useFuzzySearchList({
    list: props.searchValue ? props.items : [],
    queryText: props.searchValue,
    getText: props.getText,
    mapResultItem: props.mapResultItem
  })

  const results = filteredList.slice(0, props.limit ?? 5)

  return (
    <BaseAutocomplete.Root
      onValueChange={(val) => props.onChange(val)}
      value={props.value}
    >
      <BaseAutocomplete.Input
        render={(inputProps) => (
          <AutocompleteInput
            {...inputProps}
            compact={props.compact}
            valid={props.valid ?? true}
            onFocus={(e) => {
              inputProps.onFocus?.(e)
              props.onFocus?.()
            }}
            onBlur={(e) => {
              inputProps.onBlur?.(e)
              props.onBlur?.()
            }}
          />
        )}
      />
      {results.length > 0 && (
        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner side="bottom" align="start" sideOffset={2}>
            <BaseAutocomplete.Popup>
              <BaseAutocomplete.List render={<AutocompleteResults />}>
                {results.map((item, index) => (
                  <BaseAutocomplete.Item
                    key={index}
                    value={props.getItemValue(item)}
                    onClick={() => props.onSelect(item)}
                    render={<ResultsItem />}
                  >
                    {props.ItemRender(item)}
                  </BaseAutocomplete.Item>
                ))}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      )}
    </BaseAutocomplete.Root>
  )
}

const AutocompleteResults = styled.ul`
  background-color: ${props => props.theme.colors.buttons};
  border-radius: 0.4em;
  padding: 0.2em 0;
  margin: 0.5em 0;
  height: fit-content;
  width: fit-content;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: 100;
  outline: none;
  font-family: 'Gilroy', sans-serif;
`

const ResultsItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.2em;
  padding: 4px 0.4em;
  list-style: none;
  border-radius: 0.4em;
  margin: 0 0.2em;
  cursor: pointer;
  color: ${props => props.theme.colors.textOnButtons};

  &:hover, &[data-highlighted] {
    background-color: ${props => props.theme.colors.background};
  }
`

interface ColorInputProps {
  color: Color
  onChange: (value: string) => void
  compact?: boolean
}

type ColorInputState = "nominal" | "error"

const getParsedInputColor = (parsedInput: ParsedInput): string => {
  switch (parsedInput.type) {
    case "hex": {
      return parsedInput.color
    }
    case "palette": {
      const palette = palettes.find(palette => palette.name === parsedInput.palette)
      return palette?.colors[(parsedInput.column ?? 0) + (parsedInput.row ?? 0) * 5].hex ?? ""
    }
  }
}

export const ColorInput = (
  {
    onChange,
    color,
    compact
  }: ColorInputProps
) => {
  const [inputField, setInputField] = useState(() => color.hex())
  const [focused, setFocused] = useState(false)
  const defferedInputField = useDeferredValue(inputField)
  const parsedField = parseInput(defferedInputField)
  const paletteColor: PaletteInput | undefined = parsedField?.type === "palette" ? parsedField : undefined
  const fieldState: ColorInputState = useMemo(() => {
    if (inputField && !parsedField) {
      return "error"
    }
    return "nominal"
  }, [parsedField, inputField])
  useEffect(() => {
    setInputField(color.hex())
  }, [color])

  return (
    <ColorInputWrapper>
      <HelperButtonPopover
        hidden={!focused}
        state={fieldState}
      >
        {fieldState === "nominal" && (
          <QuestionMarkIcon />
        )}
        {fieldState === "error" && (
          <ExclamationMarkIcon />
        )}
      </HelperButtonPopover>
      <Autocomplete
        items={palettes}
        value={inputField}
        getText={(item) => [item.name]}
        searchValue={paletteColor?.palette ?? ""}
        compact={compact}
        mapResultItem={item => ({
          name: item.item.name,
          color: item.item.colors[(paletteColor?.column ?? 0) + (paletteColor?.row ?? 0) * 5],
          item,
          highlightRanges: item.matches[0]
        })}
        getItemValue={item => {
          if (parsedField?.type === "palette") {
            return parsedInputToString({ ...parsedField, palette: item.name })
          }
          return item.name
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          if (!parsedField) return
          const color = getParsedInputColor(parsedField)
          try {
            Color(color)
          } catch {
            console.log(`Wrong color is submitted: ${color}`)
            return
          }
          onChange(getParsedInputColor(parsedField))
        }}
        onChange={v => setInputField(v)}
        onSelect={item => {
          if (parsedField?.type === "palette") {
            onChange(getParsedInputColor({ ...parsedField, palette: item.name }))
          }
        }}
        onEnter={() => {
          if (!parsedField) return
          onChange(getParsedInputColor(parsedField))
        }}
        ItemRender={
          (item) => (
            <React.Fragment key={item.name}>
              <ColorCell color={item.color?.hex} />
              <span><Highlight text={item.name} ranges={item.highlightRanges} /></span>
            </React.Fragment>
          )
        }
      />
    </ColorInputWrapper>
  )
}

const ColorInputWrapper = styled.div`
   position: relative;
`


const HelperButton = styled.button<{ state: ColorInputState, hidden: boolean }>`
  all: unset;
  position: absolute;
  content: ' ';
  top: 10px;
  left: -28px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.theme.colors.buttons};
  color: ${props => props.theme.colors.textOnButtons};
  transition: opacity 0.1s linear;
  > * {
    z-index: 2;
  }
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.textOnButtons};
    z-index: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: background-color 0.1s linear;
  }
  ${props => props.hidden ? css`
    opacity: 0;
    pointer-events: none;
  `: css`
    opacity: 1;
  `}
  ${props => props.state === "error" && css`
    &::after {
      background-color: ${props.theme.colors.danger};
    }
  `}
  
`

const WindowContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.773rem;
  font-family: 'Gilroy', sans-serif;
  & ul {
    list-style: none;
    padding-left: 0;
  }
`
const Popup = styled.div`
  transform-origin: var(--transform-origin);
  transition:
    transform 150ms,
    opacity 150ms;
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    transform: scale(0.9);
  }
`

const HelperButtonPopover = (props: { state: ColorInputState, hidden: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Popover.Root>
    <Popover.Trigger
      openOnHover
      render={(triggerProps) =>
        <HelperButton
          {...props}
          {...triggerProps}
          onClick={(e) => {
            e.preventDefault()
            triggerProps.onClick?.(e)
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            triggerProps.onMouseDown?.(e)
          }}
        />
      }
    >
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner sideOffset={8}>
        <Popover.Popup render={props => <Popup {...props} />}>
          <Window width={15} height={8}>
            <WindowContainer>
              <h3>Available formats:</h3>
              <ul>
                <li>Hex Code: <b>#412073</b></li>
                <li>Position: <b>D17 Hallow's Eve</b></li>
                <li>Position (alt.): <b>C4R17 Hallow's Eve</b></li>
              </ul>
            </WindowContainer>
          </Window>
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
}

const AutocompleteInput = styled.input.attrs(() => ({
  spellCheck: "false", type: "text"
})) <{ valid: boolean, compact?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${props => props.valid ? props.theme.colors.buttons : props.theme.colors.danger};
  color: ${props => props.theme.colors.textOnButtons};
  padding: 0.2em 0.3em;
  max-height: 1.3em;
  margin: 0.3em 0.3em 0.6em 0.3em;
  border-radius: 0.4em;
  font-weight: 500;
  font-size: 1.3rem;
  width: 5em;
  border: none;
  transition: background-color 0.15s linear;

  ${({ compact }) => !compact && css`
    margin-right: 0;
    font-size: 1em;
  `}
  
  &:hover {
    background-color: ${props => props.valid ? props.theme.colors.darken.buttons : props.theme.colors.darken.danger};
  }
  
  &:focus {
      outline: none;
  }
`
