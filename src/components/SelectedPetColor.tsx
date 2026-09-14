import { PetColor } from "src/common/pet-colors"
import styled, { ThemeColors, keyframes } from "styled-components"
import { Window } from "./shared/Window"
import { MatchedColor } from "./Suggestions"
import { Waves } from "src/assets/Waves"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"
import { FlexColumnCenter } from "./shared/FlexColumnCenter"


interface SelectedPetColorProps {
  matchedColor: MatchedColor,
}

export const SelectedPetColor = ({ matchedColor: matchedColor }: SelectedPetColorProps) => {
  if (matchedColor.kind !== "pet") throw Error("Selected color kind mistmach")
  const { t } = useTranslation()
  const theme = useTheme()
  return <Window width={10.6} height={30}>
    <FlexColumnCenter style={{textAlign: "center"}}>
      <Waves style={{
        width: "8.8em",
        marginTop: "0.2em",
        marginBottom: "0.1em",
        pointerEvents: "none",
        userSelect: "none"
      }}/>
      <Header>{t("colorPicker.selectedColor.selectedColor")}</Header>
      <Waves style={{
        width: "8.8em",
        marginTop: "0",
        marginBottom: "0.5em",
        pointerEvents: "none",
        userSelect: "none"
      }}/>
      <ColorWrapper colors={theme.colors} outline>
        <FurImg src={`images/pet_colors/${matchedColor.petColor.imageName}`} />
        <ColorCell style={{backgroundColor: matchedColor.color}} />
      </ColorWrapper>
      <ParamTitle>Type</ParamTitle>
      <ParamDescription><strong>{matchedColor.petColor.type}</strong></ParamDescription>
      <ParamTitle>Bundle</ParamTitle>
      <ParamDescription><strong>{matchedColor.petColor.bundleName || "N/A"}</strong></ParamDescription>
      <ParamTitle>Price</ParamTitle>
      <ParamDescription><strong>{matchedColor.petColor.price || "N/A"}</strong></ParamDescription>
      <ParamTitle>How to get</ParamTitle>
      <ParamDescription><strong>{matchedColor.petColor.event || "N/A"}</strong></ParamDescription>
    </FlexColumnCenter>
  </Window>
}

const Header = styled.div`
    font-weight: 200;
    font-size: 1.75rem;
    letter-spacing: 0.001em;
    line-height: 0.93em;
    margin: 0 0;
    text-align: center;
    background: rgb(233,165,165);
    background: ${({theme}) => theme.colors.selectedColorHeader};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;
    user-select: none;
`

const gradient = keyframes`
  0% {
    background-position: 0 0;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0 0;
  }
`

const ColorWrapper = styled.div<{outline?: boolean, colors: ThemeColors}>`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 4px solid transparent;
  border-radius: 0.6em;
  background-image: ${ props => props.outline && props.colors.colorCellGradient};
  background-size: 900% 900%;
  background-origin: border-box;
  background-clip: border-box;
  animation: ${gradient} 10s ease infinite;
  cursor: ${props => props.outline ? "default" : "pointer"};
`

const ColorCell = styled.div`
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
`

const FurImg = styled.img`
  width: 100%;
  height: calc(100% - 1em);
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  border-radius: 0.5em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

const ParamTitle = styled.p`
  font-size: 0.9rem;
  margin: 0.5em 0 0.2em 0;

`
const ParamDescription = styled.p`
  font-size: 0.9rem;
  margin: 0 0 0.2em 0;
`
