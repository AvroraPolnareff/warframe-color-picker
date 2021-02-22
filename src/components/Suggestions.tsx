import React, { FC, useEffect, useRef, useState} from "react"
import {Position} from "../common/Palette";
import {Divider} from "./shared/Divider";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Window} from "./shared/Window";
import header from "../assets/suggestions.svg"
import styled from "styled-components";
import {ColorCell} from "./shared/ColorCell";
import {Badge} from "./shared/Badge";
import {Switch} from "./shared/Switch";
import {Button} from "./shared/Button";
import {positionValues, Scrollbars} from "react-custom-scrollbars"
import {SwapIcon} from "../assets/SwapIcon"
import Color from "color";


interface SuggestionsProps {
  matchedColors: MatchedColor[],
  onSuggestionClick: (key: string) => void,
  onPalettesClick: () => void
  isSuggestionsUpdating: boolean
  onSwapColor: (key: string) => void,
  height?: string
}

export interface MatchedColor {
  color: string,
  paletteName: string,
  distance: number,
  position: Position,
  uid: string
}

export const Suggestions: FC<SuggestionsProps> = (props) => {
  const scrollbarsRef = useRef<Scrollbars>(null)
  const fadesRef = useRef<HTMLDivElement>(null)
  const [switched, setSwitched] = useState(false)
  const [selected, setSelected] = useState("")
  
  useEffect(() => {
    if (props.matchedColors.length)
      setSelected(props.matchedColors[0].uid)
  }, [])
  
  useEffect(() => {
    if (!scrollbarsRef.current) return
    scrollbarsRef.current.scrollTop(0)
    if (props.matchedColors.length)
      setSelected(props.matchedColors[0].uid)
  }, [props.matchedColors])
  
  const onScrollbarUpdate = (values: positionValues) => {
    if (!fadesRef.current) return
    
    const fadesStyle = `
      position: absolute;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      pointer-events: none;
    `
    const gradient = `background: linear-gradient(
      0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) ${(1 - values.top) * 20}%,
      rgba(0,0,0,0) ${100 - (values.top) * 20}%, rgba(255,255,255,1) 100%
    )`
    
    fadesRef.current.setAttribute("style", fadesStyle + gradient)
  }
  
  const onSuggestionClick = (uid: string) => {
    props.onSuggestionClick(uid)
    setSelected(uid)
  }
  
  return (
    <Window width={14.321}>
      <FlexColumnCenter>
        <img src={header} style={{width: "12em", marginTop: "0.25em", pointerEvents: "none", userSelect: "none"}}/>
        <ItalicText>SCROLL FOR MORE!</ItalicText>
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "0.35em", marginBottom: "0.3em", marginRight: "0.6em"
        }}>
          <Button round onClick={props.onPalettesClick}>palettes</Button>
          <Switch switched={switched} width={3.5} onClick={() => setSwitched(!switched)} leftText={"%"}
                  rightText={"D"}/>
        </div>
      
      </FlexColumnCenter>
      <Divider/>
      <Faded>
        <Scrollbars
          style={{height: props.height ?? "32.55em", width: "104%"}}
          autoHide autoHideDuration={200}
          ref={scrollbarsRef}
          onUpdate={onScrollbarUpdate}
        >
          {
            props.matchedColors.map(({color, paletteName, distance, position, uid}, index) => (
              <Suggestion onSuggestionClick={onSuggestionClick}
                          color={color} name={paletteName}
                          value={(!switched ? Math.round(100 - distance) + "%" : distance.toFixed(2)).toString()}
                          uid={uid}
                          selected={selected === uid}
                          index={index}
                          animationState={props.isSuggestionsUpdating}
                          onSwapColor={props.onSwapColor}
              />
            ))
          }
        </Scrollbars>
        <div ref={fadesRef}/>
      </Faded>
    </Window>
  )
}

const Faded = styled.div`
  margin-top: 0.5em;
  position: relative;
`


const ItalicText = styled.div`
  margin-top: 0.2em;
  font-style: italic;
  font-weight: normal;
  pointer-events: none;
  user-select: none;
`

interface SuggestionProps {
  color: string,
  name: string,
  value: string,
  onSuggestionClick: (uid: string) => void,
  onSwapColor: (uid: string) => void,
  uid: string,
  selected: boolean,
  index: number,
  animationState: boolean
}

const Suggestion: FC<SuggestionProps> = ({color, name, value, onSuggestionClick, uid, selected, index, animationState, onSwapColor}) => {
  return (
    <StyledSuggestion onClick={() => onSuggestionClick(uid)} selected={selected} state={animationState}
                      delay={0.05 * index}>
      <FlexCentred>
        
        <ColorCell color={color} outline={selected}>
          {selected &&
            <HoverableSwap onClick={() => onSwapColor(uid)}>
                <SwapIcon style={{
                  width: "1.1em",
                  position: "absolute",
                  margin: "0 auto 0 0.1em",
                  fill: Color(color).isLight() ? "#000" : "#FFF"
                  
                }}/>
            </HoverableSwap>
          }
        </ColorCell>
        <Badge hoverable={!selected} selected={selected}>
          {name.slice(0, 12) + (name.length > 12 ? "." : "")}
        </Badge>
      </FlexCentred>
      <Badge width={3} style={{marginRight: "0.6em"}}>
        {value}
      </Badge>
    </StyledSuggestion>
  )
}

const HoverableSwap = styled.div`
  position: relative;
  opacity: 0;
  transition: opacity 0.1s linear;
  
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const StyledSuggestion = styled.div.attrs<{ selected: boolean, state: boolean, delay?: number }>((props) => ({
  style: {
    transitionDelay: `${props.state ? "0" : props.delay}s`,
    opacity: props.state ? "0" : "1"
  }
}))<{ selected: boolean, state: boolean, delay?: number }>`
  ${props => !props.selected && "cursor: pointer"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  padding-bottom: 0.055rem;
  margin-right: 0.2em;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.15s linear;
`

const FlexCentred = styled.div`
  display: flex;
  align-items: center;
`