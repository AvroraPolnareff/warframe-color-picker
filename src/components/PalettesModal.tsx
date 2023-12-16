import React, {useState} from "react"
import styled from "styled-components";
import {Modal} from "./shared/Modal";
import {palettes} from "../common/palettes"
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {WarframePalette} from "./shared/WarframePalette";
import {useTranslation} from "react-i18next";
import { sortBy } from "lodash";

interface PalettesModalProps {
  show: boolean,
  availablePalettes: string[],
  onPaletteClick: (paletteName: string) => void,
  onDisableAll: () => void,
  onEnableAll: () => void,
  onExit: () => void
}

export const PalettesModal = (
  {
    show,
    availablePalettes,
    onPaletteClick,
    onDisableAll,
    onEnableAll,
    onExit
  }: PalettesModalProps
) => {
  const [hoveredPalette, setHoveredPalette] = useState("Classic")
  const {t} = useTranslation()

  return (
    <Modal
      show={show} width={32} name={t("palettesModal.modalName")}
      description={t("palettesModal.description")} onExit={onExit}
    >
      <div style={{position: "relative"}}>
        <HoveredPalette>
          {/*@ts-ignore*/}
          <PaletteName>{t(`palettes.${hoveredPalette}`)}</PaletteName>
            <WarframePalette size={1.5} paletteName={hoveredPalette} />
        </HoveredPalette>

      <Grid dir="">
        {sortBy(palettes, ['name']).map(({name}) => <Button round small
          onClick={() => onPaletteClick(name)} onMouseOver={() => setHoveredPalette(name)}
          success={availablePalettes.indexOf(name) !== -1}
        >
          {/*@ts-ignore*/}
          {(t(`palettes.${name}`) as string).slice(0, 12) + ((t(`palettes.${name}`) as string).length > 13 ? "." : "")}
        </Button>)}
      </Grid>
      <Divider/>
      <div style={{textAlign: "right", marginTop: "0.5rem"}}>
        <Button round small onClick={onDisableAll} style={{marginRight: '0.4em'}}>
          {t("palettesModal.disableAll")}
        </Button>
        <Button round small onClick={onEnableAll}>
          {t("palettesModal.enableAll")}
        </Button>
      </div>
      </div>

    </Modal>

  )
}

const HoveredPalette  = styled.div`
  position: absolute;
  right: -11.2em;
  top: -1.9em;
  border: 4px solid ${props => props.theme.colors.buttons};
  padding: 0.4em 0.6em;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 0.8em;
`

const PaletteName = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textOnBackground};
  font-size: 0.655rem;
  text-transform: uppercase;
  width: 11.8em;
  border: 0.15em solid ${props => props.theme.colors.misc};
  border-radius: 0.5em;
  padding: 0.5em 0;
  margin-bottom: 0.5em;
  margin-top: 0.4em;
  font-weight: bold;
`


const Grid = styled.div`
  color: ${props => props.theme.colors.textOnBackground};
  display: grid;
  grid-template-rows: repeat(15, 1fr);
  row-gap: 0.2em;
  grid-auto-flow: column;
  justify-items: start;

  margin-bottom: 0.8em;
`
