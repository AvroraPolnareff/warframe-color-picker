import React, {FC, useEffect, useState} from "react";
import Color from "color";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled from "styled-components";
import {Divider} from "./shared/Divider";
import {ColorPickerHeader} from "../assets/ColorPickerHeader"
import {Picker} from "./Picker";

interface ColorPickerProps {
  color: Color,
  onColorChange: (color: Color) => void
}


export const ColorPicker: FC<ColorPickerProps> = ({onColorChange, color}) => {
  const fontSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'))
  
  return (
    <Window width={15.757}>
      <FlexColumnCenter>
        <FlexRow>
          <HeaderWrapper>
            <ColorPickerHeader headerColor={color} width={8.2}/>
          </HeaderWrapper>
          <HexInput
            color={color}
            onChange={(e) => onColorChange(Color().hex(e.target.value))}
          />
        </FlexRow>
        <div style={{marginBottom: "0.4rem", marginTop: "0.4em"}}>
          <Picker size={11 * fontSize} color={color} onChange={onColorChange}/>
        </div>
        <Divider/>
      </FlexColumnCenter>
      <NumbersPicker color={color} onColorChange={onColorChange}/>
    </Window>
  )
}


interface NumbersPickerProps {
  color: Color,
  onColorChange: (color: Color) => void
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

const NumbersPicker: FC<NumbersPickerProps> = ({color, onColorChange}) => {
  const [hsvValue, setHsvValue] = useState({h: 0, s: 0, v: 0})
  const [userTyping, setUserTyping] = useState(false)
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    if (!userTyping) {
      setHsvValue({h: color.hue(), s: color.saturationv(), v: color.value()})
    }
  }, [color])
  
  const onChange = (name: string, value: number) => {
    clearTimeout(timer)
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
      <Grid2X4>
        <ColorSchemeName>RGB</ColorSchemeName>
        <ColorInput name={"red"} onChange={onChange} min={0} max={255}
                    color="#dba3a3" value={Math.round(color.red())}/>
        <ColorInput name={"green"} onChange={onChange} min={0} max={255}
                    color="#a3dba3" value={Math.round(color.green())}/>
        <ColorInput name={"blue"} onChange={onChange} min={0} max={255}
                    color="#a3a3db" value={Math.round(color.blue())}/>
        <ColorSchemeName>HSV</ColorSchemeName>
        <ColorInput name={"hue"}  min={0} max={359}
                    onChange={onChange} value={Math.round(hsvValue.h)}/>
        <ColorInput name={"saturationv"} min={0} max={100}
                    onChange={onChange} value={Math.round(hsvValue.s)}/>
        <ColorInput name={"value"} min={0} max={100}
                    onChange={onChange} value={Math.round(hsvValue.v)}/>
      </Grid2X4>
    </StyledPicker>
  )
}

const StyledPicker = styled.div`
    margin-top: 0.35rem;
`


interface ColorInputProps {
  value: number,
  name: string,
  min: number,
  max: number,
  onChange: (name: string, value: number) => void,
  color?: string
}

const ColorInput: FC<ColorInputProps> = ({value, name, onChange, min, max, color}) => {
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
    background-color: ${props => props.color || props.theme.colors.secondary};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.2em 0.3em;
    max-height: 1.3em;
    margin: 0 0.2em;
    border-radius: 0.3em;
    font-weight: 600;
    font-size: 1.06em;
    width: 2.35em;
    border: none;
    transition: background-color 0.15s linear;
  
    &:focus, &:hover {
      background-color: ${props => Color(props.color || props.theme.colors.secondary).darken(0.2).toString()};
    }
    
    &:focus {
        outline: none;
    }
`


const Grid2X4 = styled.div`
    display: grid;
    align-items: baseline;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 0.7em;
    justify-items: start;
    justify-content: start;
    width: fit-content;
    margin-left: 0.9em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`

const ColorSchemeName = styled.div`
    padding-right: 0.3em;
    font-weight: bold;
`

interface HexInputProps {
  color: Color;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const HexInput: FC<HexInputProps> = ({onChange, color}) => {
  const [validHex, setValidHex] = useState(true)
  const [inputField, setInputField] = useState("#909090")
  const [userTyping, setUserTyping] = useState(false)
  const [timer, setTimer] = useState(0)
  
  useEffect(() => {
    if (!userTyping) {
      setInputField(color.hex())
      setValidHex(true)
    }
  }, [color])
  
  const changeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
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
      value={inputField}
      onChange={changeHex} valid={validHex}
    />
  )
}

const StyledHexInput = styled.input.attrs(props => ({
  spellCheck: "false", type: "text"
}))<{ valid: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${props => props.valid ? props.theme.colors.secondary : props.theme.colors.danger};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.2em 0.3em;
    max-height: 1.3em;
    //margin: 0 0.5rem;
    margin-right: 0.3em;
    margin-top: 0.3em;
    border-radius: 0.4em;
    font-weight: normal;
    font-size: 1.06em;
    width: 5em;
    border: none;
    transition: background-color 0.15s linear;
  
    &:hover {
      background-color: ${props => props.valid ? props.theme.colors.darken.secondary : props.theme.colors.darken.danger};
    }
    
    &:focus {
        outline: none;
    }
`

const HeaderWrapper = styled.div`
    position: relative;
    top: -1.7em;
    left: -1em;
`

const FlexRow = styled.div`
    display: flex;
    max-height: 2.3rem;
`

