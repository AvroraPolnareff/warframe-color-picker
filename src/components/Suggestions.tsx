import React, {Component, FC} from "react"
import {Position} from "../common/Palette";
import {Divider} from "./shared/Divider";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Window} from "./shared/Window";
import header from "../assets/SUGGESTIONS.svg"
import styled from "styled-components";
import {ColorCell} from "./shared/ColorCell";
import {Badge} from "./shared/Badge";
import {throttle} from "lodash"
import {Switch} from "./shared/Switch";
import {Button} from "./shared/Button";

interface SuggestionsProps {
  matchedColors: MatchedColor[],
  onSuggestionClick: (key: string) => void,
  onPalettesClick: () => void
}

export interface MatchedColor {
  color: string,
  paletteName: string,
  distance: number,
  position: Position,
  uid: string
}

export class Suggestions extends Component<SuggestionsProps, {
  throttledColors : MatchedColor[],
  switched: boolean,
  selected: string
}> {
  constructor(props: Readonly<SuggestionsProps>) {
    super(props);
    this.state = {throttledColors: [], switched: false, selected: ""}
  }
  
  //throttle = throttle((fn, data) => fn(data), 500)
  
  componentDidMount = () => {
    this.setState((state, props) => ({...state, throttledColors: props.matchedColors}))
    this.setState((state, props) => ({...state, selected: props.matchedColors[0].uid}))
  }
  
  componentDidUpdate = (prevProps: Readonly<SuggestionsProps>, prevState: Readonly<{}>, snapshot?: any) => {
    //this.throttle(this.setState.bind(this), {throttledColors: this.props.matchedColors})
    
  }
  
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
      <Window width={11.1}>
        <FlexColumnCenter>
          <img src={header} style={{width: "11rem", marginTop: "0.2rem"}}/>
          <ItalicText>SCROLL FOR MORE!</ItalicText>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: "0.35rem", marginBottom: "0.3rem", marginRight:"0.3rem"
          }}>
            <Button round onClick={this.props.onPalettesClick}>palettes</Button>
            <Switch switched={this.state.switched} width={2.7} onClick={this.onSwitch} leftText={"%"} rightText={"D"}/>
          </div>
          
        </FlexColumnCenter>
        <Divider/>
        <Faded>
  
          {
            this.props.matchedColors.map(({color, paletteName, distance, position, uid}) => (
              <Suggestion onSuggestionClick={this.onSuggestionClick}
                          color={color} name={paletteName}
                          value={(!this.state.switched ? Math.round(100 - distance) + "%" : distance.toFixed(2)).toString()}
                          uid={uid} selected={this.isSelected(uid)} key={uid}/>
            ))
          }
        </Faded>
      </Window>
    )
  }
}

const Faded = styled.div`
  margin-top: 0.4rem;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    height: 100%;
    bottom: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 30%);
    pointer-events: none;
  }
`


const ItalicText = styled.div`
    font-style: italic;
    font-weight: 400;
`

interface SuggestionProps {
  color: string,
  name: string,
  value: string,
  onSuggestionClick: (uid: string) => void,
  uid: string
  selected: boolean
}

const Suggestion : FC<SuggestionProps> = ({color, name, value, onSuggestionClick, uid, selected}, key) => {
  return (
    <StyledSuggestion onClick={() => onSuggestionClick(uid)} selected={selected}>
      <FlexCentred>
          <ColorCell color={color} outline={selected}/>
        <Badge hoverable={!selected} selected={selected}>
          {name.slice(0, 11) + (name.length > 12 ? "." : "")}
        </Badge>
      </FlexCentred>
      <Badge width={1.7}>
        {value}
      </Badge>
    </StyledSuggestion>
  )
}



const StyledSuggestion = styled.div<{selected: boolean}>`
    ${props => !props.selected && "cursor: pointer"};
    font-size: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    padding-bottom: 0.055rem;
    -webkit-tap-highlight-color: transparent;
    
`

const FlexCentred = styled.div`
    display:flex;
    align-items: center;
`