import React, {useEffect, useState} from "react";
import Color from "color";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled, {css} from "styled-components";
import {Divider} from "./shared/Divider";
import {ColorPickerHeader} from "../assets/ColorPickerHeader"
import {Picker} from "./Picker";
import {useFontSize} from "../hooks/useFontSize";

interface ColorPickerProps {
  color: Color,
  onColorChange: (color: Color) => void
  compact?: boolean
}

export const ColorPicker = (
  {
    onColorChange,
    color,
    compact
  }: ColorPickerProps
) => {
  const fontSize = useFontSize();

  return (
    <div style={{position: 'relative'}}>
      <HeaderWrapper>
        <ColorPickerHeader headerColor={color} width={7.5}/>
      </HeaderWrapper>
      <Window width={compact ? 16.2 : 14.2}>
        {compact ? (
            <FlexRow>
              <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{marginTop: "1.3em"}}>
                  <Picker size={7.3 * fontSize} color={color} onChange={onColorChange}/>
                </div>
              </div>
              <FlexColumnCenter style={{width: "45%"}}>
                <HexInput
                  compact={compact}
                  color={color}
                  onChange={(e) => onColorChange(Color().hex(e.target.value))}
                />
                <Divider/>
                <NumbersPicker color={color} onColorChange={onColorChange} compact={compact}/>
              </FlexColumnCenter>
            </FlexRow>
          ) : (
            <>
              <div style={{display: "flex", flexDirection: "row-reverse"}}>
                <HexInput
                  compact={compact}
                  color={color}
                  onChange={(e) => onColorChange(Color().hex(e.target.value))}
                />
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "0.3em"}}>
                <Picker size={10.3 * fontSize} color={color} onChange={onColorChange}/>
                <Divider style={{marginTop: "0.5em"}}/>
                <div style={{alignSelf: "flex-start"}}>
                  <NumbersPicker color={color} onColorChange={onColorChange} compact={compact}/>
                </div>

              </div>
            </>
          )
        }
      </Window>
    </div>
  )
}

const HeaderWrapper = styled.div<{compact?: boolean}>`
    position: absolute;
    
    top: -1.5em;
    left: 0;
    pointer-events: none;
`

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
`


interface NumbersPickerProps {
  color: Color,
  onColorChange: (color: Color) => void
  compact?: boolean
}

const limitNumber = (number: number, min: number, max: number) => {
  if (number < min)
    return min
  if (number > max)
    return max
  if (isNaN(number))
    return 0
  return number
}

const NumbersPicker = (
  {
    color,
    onColorChange,
    compact
  }: NumbersPickerProps
) => {
  const [hsvValue, setHsvValue] = useState({h: 0, s: 0, v: 0})
  const [userTyping, setUserTyping] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!userTyping) {
      setHsvValue({h: color.hue(), s: color.saturationv(), v: color.value()})
    }
  }, [color, userTyping])

  const onChange = (name: string, value: number) => {
    if (timer) {
      clearTimeout(timer)
    }
    switch (name) {
      case "red":
        onColorChange(color.red(value))
        break
      case "green":
        onColorChange(color.green(value))
        break
      case "blue":
        onColorChange(color.blue(value))
        break
      case "hue":
        setTimer(setTimeout(() => setUserTyping(false), 500))
        setUserTyping(true)
        setHsvValue({...hsvValue, h: limitNumber(value, 0, 360)})
        onColorChange(color.hue(value))
        break
      case "saturationv":
        setTimer(setTimeout(() => setUserTyping(false), 500))
        setUserTyping(true)
        setHsvValue({...hsvValue, s: limitNumber(value, 0, 100)})
        onColorChange(color.saturationv(value))
        break
      case "value":
        setTimer(setTimeout(() => setUserTyping(false), 500))
        setUserTyping(true)
        setHsvValue({...hsvValue, v: limitNumber(value, 0, 100)})
        onColorChange(color.value(value))
        break
      default:
        return
    }
  }

  return (
    <StyledPicker>
      {compact ? (
        <Grid2X4 compact={compact}>
          <ColorInput name={"red"} onChange={onChange} min={0} max={255}
                      color="#dba3a3" value={Math.round(color.red())}/>
          <ColorInput name={"green"} onChange={onChange} min={0} max={255}
                      color="#a3dba3" value={Math.round(color.green())}/>
          <ColorInput name={"blue"} onChange={onChange} min={0} max={255}
                      color="#a3a3db" value={Math.round(color.blue())}/>
          <ColorSchemeName>R</ColorSchemeName>
          <ColorSchemeName>G</ColorSchemeName>
          <ColorSchemeName>B</ColorSchemeName>
          <ColorInput name={"hue"} min={0} max={359}
                      onChange={onChange} value={Math.round(hsvValue.h)}/>
          <ColorInput name={"saturationv"} min={0} max={100}
                      onChange={onChange} value={Math.round(hsvValue.s)}/>
          <ColorInput name={"value"} min={0} max={100}
                      onChange={onChange} value={Math.round(hsvValue.v)}/>
          <ColorSchemeName>H</ColorSchemeName>
          <ColorSchemeName>S</ColorSchemeName>
          <ColorSchemeName>V</ColorSchemeName>
        </Grid2X4>
      ) : (
        <Grid2X4 compact={compact}>
          <ColorSchemeName>RGB&nbsp;&nbsp;&nbsp;</ColorSchemeName>
          <ColorInput name={"red"} onChange={onChange} min={0} max={255}
                      color="#dba3a3" value={Math.round(color.red())}/>
          <ColorInput name={"green"} onChange={onChange} min={0} max={255}
                      color="#a3dba3" value={Math.round(color.green())}/>
          <ColorInput name={"blue"} onChange={onChange} min={0} max={255}
                      color="#a3a3db" value={Math.round(color.blue())}/>
          <ColorSchemeName>HSV&nbsp;&nbsp;&nbsp;</ColorSchemeName>
          <ColorInput name={"hue"} min={0} max={359}
                      onChange={onChange} value={Math.round(hsvValue.h)}/>
          <ColorInput name={"saturationv"} min={0} max={100}
                      onChange={onChange} value={Math.round(hsvValue.s)}/>
          <ColorInput name={"value"} min={0} max={100}
                      onChange={onChange} value={Math.round(hsvValue.v)}/>
        </Grid2X4>
      )

      }

    </StyledPicker>
  )
}

const StyledPicker = styled.div`
    margin-top: 0.75em;
    margin-right: 0.3em;
`

const Grid2X4 = styled.div<{compact?: boolean}>`
    display: grid;
    align-items: baseline;
    grid-template-columns: ${({compact}) => compact ? "repeat(3, 1fr)" : "repeat(4, 1fr)" };
    row-gap: ${({compact}) => compact ? "0.05em" : "0.5em" };
    justify-items: center;
    justify-content: start;
    width: fit-content;
`

const ColorSchemeName = styled.div`
    padding-left: 0.07em;
    font-weight: bold;
    font-size: 0.9rem;
`


interface ColorInputProps {
  value: number,
  name: string,
  min: number,
  max: number,
  onChange: (name: string, value: number) => void,
  color?: string
}

const ColorInput = (
  {
    value,
    name,
    onChange,
    min,
    max,
    color
  }: ColorInputProps
) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, limitNumber(parseInt(e.target.value), min, max))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      onChange(name, limitNumber(value - 1, min, max))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      onChange(name, limitNumber(value + 1, min, max))
    }
  }

  return <StyledColorInput onChange={onInputChange} onKeyDown={onKeyDown} value={value.toString()} color={color}/>
}

const StyledColorInput = styled.input`
    display: flex;
    align-items: baseline;
    background-color: ${props => props.color || props.theme.colors.tertiary};
    color: ${props => props.theme.colors.background};
    padding: 0.2em 0.15em;
    max-height: 1.3em;
    margin: 0 0.2em;
    border-radius: 0.35em;
    font-weight: 500;
    font-size: 0.9rem;
    width: 2.05em;
    border: none;
    transition: background-color 0.15s linear;
    text-align: center;
  
    &:focus, &:hover {
      background-color: ${props => Color(props.color || props.theme.colors.tertiary).darken(0.2).toString()};
    }
    
    &:focus {
        outline: none;
    }
`


interface HexInputProps {
  color: Color
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  compact?: boolean
}

const HexInput = (
  {
    onChange,
    color,
    compact
  }: HexInputProps
) => {
  const [validHex, setValidHex] = useState(true)
  const [inputField, setInputField] = useState("#909090")
  const [userTyping, setUserTyping] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!userTyping) {
      setInputField(color.hex())
      setValidHex(true)
    }
  }, [color, userTyping])

  const changeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(setTimeout(() => setUserTyping(false), 1000))
    setUserTyping(true)
    try {
      if (e.target.value.length <= 7) {

        Color().hex(e.target.value)
        setValidHex(true)
        e.persist()
        setInputField(e.target.value)
        onChange(e)

      }

    } catch (error) {
      setValidHex(false)
      if (e.target.value[0] !== "#") {
        setInputField("#" + e.target.value)
        e.target.value = "#" + e.target.value
        changeHex(e)
      } else {
        setInputField(e.target.value)
      }
    }
  }

  return (
    <StyledHexInput
      compact={compact}
      value={inputField}
      onChange={changeHex} valid={validHex}
    />
  )
}

const StyledHexInput = styled.input.attrs(() => ({
  spellCheck: "false", type: "text"
}))<{ valid: boolean, compact?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${props => props.valid ? props.theme.colors.tertiary : props.theme.colors.danger};
  color: ${props => props.theme.colors.background};
  padding: 0.2em 0.3em;
  max-height: 1.3em;
  margin: 0.3em 0.3em 0.6em 0.3em;
  border-radius: 0.4em;
  font-weight: 500;
  font-size: 1.3rem;
  width: 5em;
  border: none;
  transition: background-color 0.15s linear;

  ${({compact}) => !compact && css`
    margin-right: 0;
    font-size: 1em;
  `}
  
  &:hover {
    background-color: ${props => props.valid ? props.theme.colors.darken.tertiary : props.theme.colors.darken.danger};
  }
  
  &:focus {
      outline: none;
  }
`


