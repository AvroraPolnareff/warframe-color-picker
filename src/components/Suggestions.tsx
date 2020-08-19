import React, {FC} from "react"
import {Position} from "../common/Palette";
import {Divider} from "./shared/Divider";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Window} from "./shared/Window";
import header from "../assets/suggestions.svg"
import styled from "styled-components";
import {ColorCell} from "./shared/ColorCell";
import {Badge} from "./shared/Badge";

interface SuggestionsProps {
  matchedColors: MatchedColor[],
  onSuggestionClick: (key: string) => void
}

export interface MatchedColor {
  color: string,
  paletteName: string,
  distance: number,
  position: Position
}

export const Suggestions : FC<SuggestionsProps> = ({matchedColors, onSuggestionClick}) => {
  return (
    <Window width={11.3}>
      <FlexColumnCenter>
        <img src={header}/>
        <ItalicText>SCROLL FOR MORE!</ItalicText>
      </FlexColumnCenter>
      <Divider/>
      {
        matchedColors.map(({color, paletteName, distance, position}) => (
          <Suggestion
            color={color} name={paletteName}
            value={distance}
            onClick={onSuggestionClick} key={color + paletteName} />
        ))
      }
    </Window>
  )
}

const ItalicText = styled.div`
    font-style: italic;
    font-weight: 400;
`

interface SuggestionProps {
  color: string,
  name: string,
  value: number,
  onClick: (key: string) => void
}

const Suggestion : FC<SuggestionProps> = ({color, name, value, onClick}) => {
  return (
    <StyledSuggestion onClick={() => onClick(name + color)}>
      <FlexCentred>
        <ColorBadge>
          <ColorCell color={color}/>
        </ColorBadge>
        <Badge>
          {name.slice(0, 11) + (name.length > 12 ? "." : "")}
        </Badge>
      </FlexCentred>
      <Badge>
        {Math.round(100 - value) + "%"}
      </Badge>
    </StyledSuggestion>
  )
}

const ColorBadge = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.badge};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.1rem;
    margin: 0 0.2rem;
    border-radius: 0.4rem;
`

const StyledSuggestion = styled.div`
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    padding-bottom: 0.3rem;
`

const FlexCentred = styled.div`
    display:flex;
    align-items: center;
`