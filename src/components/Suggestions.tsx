import React, {Component, FC, RefObject} from "react"
import {Position} from "../common/Palette";
import {Divider} from "./shared/Divider";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Window} from "./shared/Window";
import header from "../assets/SUGGESTIONS.svg"
import styled from "styled-components";
import {ColorCell} from "./shared/ColorCell";
import {Badge} from "./shared/Badge";
import {Switch} from "./shared/Switch";
import {Button} from "./shared/Button";
import {positionValues, Scrollbars} from "react-custom-scrollbars"

interface SuggestionsProps {
  matchedColors: MatchedColor[],
  onSuggestionClick: (key: string) => void,
  onPalettesClick: () => void
  isSuggestionsUpdating: boolean
}

export interface MatchedColor {
  color: string,
  paletteName: string,
  distance: number,
  position: Position,
  uid: string
}

interface SuggestionsState {
  throttledColors: MatchedColor[],
  switched: boolean,
  selected: string
}

export class Suggestions extends Component<SuggestionsProps, SuggestionsState> {
  
  scrollbarsRef: RefObject<Scrollbars>
  fadedRef: RefObject<HTMLDivElement>
  
  constructor(props: Readonly<SuggestionsProps>) {
    super(props);
    this.state = {throttledColors: [], switched: false, selected: ""}
    this.scrollbarsRef = React.createRef<Scrollbars>()
    this.fadedRef = React.createRef<HTMLDivElement>()
  }
  
  componentDidMount = () => {
    this.setState((state, props) => ({...state, throttledColors: props.matchedColors}))
    this.setState((state, props) => ({...state, selected: props.matchedColors[0].uid}))
  }
  
  componentDidUpdate = (prevProps: Readonly<SuggestionsProps>, prevState: Readonly<SuggestionsState>, snapshot?: any) => {
    if (!this.scrollbarsRef.current) return
    if (prevProps.matchedColors !== this.props.matchedColors)
      this.scrollbarsRef.current.scrollTop(0)
    
    
  }
  
  onScrollbarUpdate = (values: positionValues) => {
    if (!this.fadedRef.current) return
    const gradient = `background: linear-gradient(
        0deg, rgba(255,255,255,1) 0%,
        rgba(0,0,0,0) ${(1 - values.top) * 20}%,
        rgba(0,0,0,0) ${100 - (values.top) * 20}%,
        rgba(255,255,255,1) 100%
        )`
    this.fadedRef.current.setAttribute("style", this.fadesStyle + gradient)
    
  }
  
  fadesStyle: string = `
    position: absolute;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    pointer-events: none;
  `
  
  onSwitch = () => {
    this.setState((state, props) => ({...state, switched: !state.switched}))
  }
  
  isSelected = (uid: string) => {
    return this.state.selected === uid
  }
  
  onSuggestionClick = (uid: string) => {
    this.props.onSuggestionClick(uid)
    this.setState((state, props) => ({...state, selected: uid}))
    
  }
  
  
  render() {
    return (
      <Window width={14.321}>
        <FlexColumnCenter>
          <img src={header} style={{width: "12em", marginTop: "0.25em", pointerEvents: "none", userSelect: "none"}}/>
          <ItalicText>SCROLL FOR MORE!</ItalicText>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: "0.27rem", marginBottom: "0.3rem", marginRight: "0.3rem"
          }}>
            <Button round onClick={this.props.onPalettesClick}>palettes</Button>
            <Switch switched={this.state.switched} width={3.5} onClick={this.onSwitch} leftText={"%"} rightText={"D"}/>
          </div>
        
        </FlexColumnCenter>
        <Divider/>
        <Faded>
          <Scrollbars
            style={{height: "20em"}}
            autoHide autoHideDuration={200}
            ref={this.scrollbarsRef}
            onUpdate={this.onScrollbarUpdate}
          >
            {
              this.props.matchedColors.map(({color, paletteName, distance, position, uid}, index) => (
                <Suggestion onSuggestionClick={this.onSuggestionClick}
                            color={color} name={paletteName}
                            value={(!this.state.switched ? Math.round(100 - distance) + "%" : distance.toFixed(2)).toString()}
                            uid={uid} selected={this.isSelected(uid)} index={index}
                            animationState={this.props.isSuggestionsUpdating}
                />
              ))
            }
          </Scrollbars>
          <div ref={this.fadedRef}/>
        </Faded>
      </Window>
    )
  }
}

const Faded = styled.div`
  margin-top: 0.4em;
  position: relative;
`


const ItalicText = styled.div`
  margin-top: 0.2em;
  font-style: italic;
  font-weight: 400;
  pointer-events: none;
  user-select: none;
`

interface SuggestionProps {
  color: string,
  name: string,
  value: string,
  onSuggestionClick: (uid: string) => void,
  uid: string,
  selected: boolean,
  index: number,
  animationState: boolean
}

const Suggestion: FC<SuggestionProps> = ({color, name, value, onSuggestionClick, uid, selected, index, animationState}) => {
  return (
    <StyledSuggestion onClick={() => onSuggestionClick(uid)} selected={true} state={animationState}
                      delay={0.05 * index}>
      <FlexCentred>
        <ColorCell color={color} outline={selected}/>
        <Badge hoverable={!selected} selected={selected}>
          {name.slice(0, 12) + (name.length > 12 ? "." : "")}
        </Badge>
      </FlexCentred>
      <Badge>
        {value}
      </Badge>
    </StyledSuggestion>
  )
}


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
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s linear;
    
}
  
`

const FlexCentred = styled.div`
    display:flex;
    align-items: center;
`