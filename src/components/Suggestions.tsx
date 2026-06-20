import React, {useContext, useEffect, useRef, useState} from "react"
import {Position} from "../common/Palette";
import {Divider} from "./shared/Divider";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Window} from "./shared/Window";
import styled from "styled-components";
import {ColorCell} from "./shared/ColorCell";
import {Badge} from "./shared/Badge";
import {Switch} from "./shared/Switch";
import {Button} from "./shared/Button";
import {Scrollbars} from "./shared/scrollbars"
import {ScrollableFadedList} from "./shared/ScrollableFadedList"
import {SwapIcon} from "../assets/SwapIcon"
import Color from "color";
import {useTranslation} from "react-i18next";
import {SettingsContext} from "../providers/SettingsProvider";
import { stringEllipsis } from "src/common/helpers";


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

export const Suggestions = (props: SuggestionsProps) => {
  const scrollbarsRef = useRef<Scrollbars>(null)
  const [switched, setSwitched] = useState(false)
  const [selected, setSelected] = useState("")
  const {t} = useTranslation()
  const {theme} = useContext(SettingsContext)
  useEffect(() => {
    if (props.matchedColors.length)
      setSelected(props.matchedColors[0].uid)
  }, [setSelected, props.matchedColors])

  useEffect(() => {
    if (!scrollbarsRef.current) return
    scrollbarsRef.current.scrollTop(0)
    if (props.matchedColors.length)
      setSelected(props.matchedColors[0].uid)
  }, [props.matchedColors])

  const onSuggestionClick = (uid: string) => {
    props.onSuggestionClick(uid)
    setSelected(uid)
  }

  return (
    <Window width={14.321}>
      <FlexColumnCenter>
        <img
          src={`/images/suggestions-${theme}.svg`}
          style={{width: "12em", marginTop: "0.25em", pointerEvents: "none", userSelect: "none"}}
          alt=""
        />
        <ItalicText>{t("colorPicker.suggestions.scroll")}</ItalicText>
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "0.35em", marginBottom: "0.3em", marginRight: "0.6em"
        }}>
          <Button round onClick={props.onPalettesClick}>{t("colorPicker.suggestions.palettes")}</Button>
          <Switch switched={switched} width={3.5} onClick={() => setSwitched(!switched)} leftText={"%"}
                  rightText={"D"}/>
        </div>

      </FlexColumnCenter>
      <Divider/>
      <ScrollableFadedList
        height={props.height ?? "32.55em"}
        // @ts-ignore
        scrollbarsRef={scrollbarsRef}
      >
        {
          props.matchedColors.map(({color, paletteName, distance, position, uid}, index) => (
            <Suggestion
              onSuggestionClick={onSuggestionClick}
              color={color} name={paletteName}
              value={(!switched ? Math.round(100 - distance) + "%" : distance.toFixed(2)).toString()}
              uid={uid}
              selected={selected === uid}
              key={index}
              index={index}
              animationState={props.isSuggestionsUpdating}
              onSwapColor={props.onSwapColor}
            />
          ))
        }
      </ScrollableFadedList>
    </Window>
  )
}

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

const Suggestion = (
  {
    color,
    name,
    value,
    onSuggestionClick,
    uid,
    selected,
    index,
    animationState,
    onSwapColor
  }: SuggestionProps
) => {
  const {t} = useTranslation()
  return (
    <StyledSuggestion onClick={() => onSuggestionClick(uid)} selected={selected} state={animationState}
                      delay={0.01 * index}>
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
          {/*@ts-ignore*/}
          {stringEllipsis(t(`palettes.${name}`) as string, 13)}
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
  transition: opacity 0.10s linear;
`

const FlexCentred = styled.div`
  display: flex;
  align-items: center;
`
