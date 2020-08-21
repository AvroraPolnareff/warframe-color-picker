import React, {FC, useEffect, useRef, useState} from "react";
import Color from "color";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled from "styled-components";
import {Divider} from "./shared/Divider";
import header from "../assets/color_picker_header.svg"
import picker from "../assets/picker.png"
import {Picker} from "./Picker";

interface ColorPickerProps {
  color: Color,
  onColorChange: (color: Color) => void
}



const drawWheel = (ctx: CanvasRenderingContext2D, canvasWidth: number, wheelWidth: number) => {
  const center = canvasWidth / 2
  const outerRadius = canvasWidth / 2
  const innerRadius = canvasWidth / 2 - wheelWidth
  let hAngle = 0;
  for (let angle = 0; angle <= 360; angle++ ) {
    const startAngle = (angle - 2) * Math.PI / 180;
    const endAngle = (angle) * Math.PI / 180;
    
    ctx.beginPath()
    ctx.moveTo(center, center);
    ctx.arc(center, center, outerRadius, startAngle, endAngle, false)
    ctx.closePath()
    
    const targetColor = Color().hsv(hAngle, 100, 100);
    ctx.fillStyle = `rgb(${targetColor.red()}, ${targetColor.green()}, ${targetColor.blue()} )`
    
    ctx.fill()
    
    hAngle++
    if (hAngle >= 360)
      hAngle = 0
    
  }
  
  
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(center, center, innerRadius, 0, Math.PI * 2)
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}



export const ColorPicker: FC<ColorPickerProps> = ({onColorChange, color}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const ctx = ref.current.getContext("2d")
    if (!ctx) {
      return
    }
    
    
    
  }, [color])
  return (
    <Window width={12.3}>
      <FlexColumnCenter>
        <FlexRow>
          <HeaderWrapper>
            <img src={header}/>
          </HeaderWrapper>
          <HexInput
            color={color}
            onChange={(e) => onColorChange(Color().hex(e.target.value))}
          />
        </FlexRow>
        {/*<PickerImg src={picker}/>*/}
        <Picker size={180} color={color} onChange={onColorChange}/>
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

const NumbersPicker: FC<NumbersPickerProps> = ({color, onColorChange}) => {
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "0" : e.target.value
    switch (e.target.name) {
      case "red":
        onColorChange(color.red(parseInt(value)))
        break
      case "green":
        onColorChange(color.green(parseInt(value)))
        break
      case "blue":
        onColorChange(color.blue(parseInt(value)))
        break
      case "hue":
        onColorChange(color.hue(parseInt(value)))
        break
      case "saturation":
        onColorChange(color.saturate(parseInt(value)))
        break
      case "lightness":
        onColorChange(color.lightness(parseInt(value)))
        break
      default:
        return
    }
  }
  
  return (
    <StyledPicker>
      <Grid2X4>
        <ColorSchemeName>RGB</ColorSchemeName>
        <ColorInput name={"red"} onChange={onChange} color="#dba3a3" value={color.red()}/>
        <ColorInput name={"green"} onChange={onChange} color="#a3dba3" value={color.green()}/>
        <ColorInput name={"blue"} onChange={onChange} color="#a3a3db" value={color.blue()}/>
        <ColorSchemeName>HSL</ColorSchemeName>
        <ColorInput name={"hue"} onChange={onChange} value={Math.round(color.hue())}/>
        <ColorInput name={"saturation"} onChange={onChange} value={Math.round(color.saturationl())}/>
        <ColorInput name={"lightness"} onChange={onChange} value={Math.round(color.lightness())}/>
      </Grid2X4>
    </StyledPicker>
  )
}

const StyledPicker = styled.div`
    margin-top: 0.3em;
    font-size: 14px
`

const ColorInput = styled.input`
    display: flex;
    align-items: center;
    background-color: ${props => props.color || props.theme.colors.badge};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.1rem 0.3rem;
    max-height: 1.2rem;
    margin: 0 0.2rem;
    border-radius: 0.4rem;
    font-weight: 600;
    font-size: 14px;
    width: 1.5rem;
    border: none;
    
    &:focus {
        outline: none;
    }
`


const Grid2X4 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 0.3rem;
    justify-items: start;
    justify-content: start;
    width: fit-content;
    margin-left: 0.5rem;
`

const ColorSchemeName = styled.div`
    padding-right: 0.3em
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
  const [onChangeTimeout, setOnChangeTimeout] = useState(0)
  
  useEffect(() => {
    if (!userTyping) {
      setInputField(color.hex())
      setValidHex(true)
    }
  }, [color])
  
  const changeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    clearTimeout(onChangeTimeout)
    setTimer(setTimeout(() => setUserTyping(false), 1000))
    try {
      if (e.target.value.length <= 7) {
        Color().hex(e.target.value)
        setValidHex(true)
        e.persist()
        setInputField(e.target.value)
        setOnChangeTimeout(setTimeout(() => onChange(e), 2000))
      }
      
    } catch (error) {
      setValidHex(false)
      setInputField(e.target.value)
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
    background-color: ${props => props.valid ? props.theme.colors.badge : "#dba3a3"};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.1rem 0.3rem;
    max-height: 1.2rem;
    margin: 0 0.2rem;
    border-radius: 0.4rem;
    font-weight: normal;
    font-size: 15px;
    width: 3.9rem;
    border: none;
    
    &:focus {
        outline: none;
    }
`

const HeaderWrapper = styled.div`
    position: relative;
    top: -2.7em;
    left: -1.2em;


`

const FlexRow = styled.div`
    display: flex;
    max-height: 2.3rem;
`

const PickerImg = styled.img`
    margin-bottom: 0.5em;
`

