import React, {useState} from "react"
import styled, {css} from "styled-components";
import {Modal} from "./shared/Modal";
import {palettes} from "../common/palettes"
import {paletteDescriptions, paletteGroups} from "../common/palette-descriptions"
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {WarframePalette} from "./shared/WarframePalette";
import {useTranslation} from "react-i18next";
import { groupBy, merge, sortBy, assign } from "lodash";
import { stringEllipsis } from "src/common/helpers";
import { Palette, PaletteColor } from "src/common/Palette";
import { ScrollableFadedList } from "./shared/ScrollableFadedList";

type ModalPalette = {
  kind: "palette",
  name: string,
  colors: PaletteColor[],
  description: string
}

type PaletteGroup = {
  kind: "group",
  name: string,
  palettes: ModalPalette[]
}

type PaletteCategory = {
  name: string,
  palettes: (ModalPalette | PaletteGroup)[],
}

type ModalPalettes = PaletteCategory[]

const modalPaletteGroups = Object.entries(paletteGroups).map(([name, palettes]) => ({name, palettes}))

const modalPalettes: ModalPalettes = Object.entries(paletteDescriptions).map(([category, palettesWithDescriptions]) => {
  const descriptionsList = Object.entries(palettesWithDescriptions)
    .map(([paletteName, description]) => ({ paletteName, description }))

  const categoryPalettes = descriptionsList.map(({ paletteName, description }) => {
        const paletteColors = palettes.find(palette => palette.name === paletteName)?.colors
        if (!paletteColors) {
          throw Error(`Palette not found for ${paletteName} from description record. Check src/common/palette-descriptions.ts file.`)
        }
        const paletteGroup = modalPaletteGroups.find(group => group.palettes.includes(paletteName))
    return {
          kind: "palette" as const,
          name: paletteName,
          description: description,
          colors: paletteColors,
          group: paletteGroup?.name
        }
      })
  const groupedPalletes = Object.entries(groupBy(categoryPalettes, "group"))
    .map(([groupName, palettes]) => {
      const mappedPalettes = palettes.map(({kind, name, description, colors}) => ({kind, name, description, colors}))
      if (groupName !== "undefined") {
        return {
          kind: "group" as const,
          name: groupName,
          palettes: mappedPalettes
        }
      }
      return mappedPalettes
    }).flat()
  return {
    name: category,
    palettes: groupedPalletes
  }
})

interface PalettesModalProps {
  show: boolean,
  availablePalettes: string[],
  onPaletteClick: (paletteName: string) => void,
  onDisableAll: (palettes: string[]) => void,
  onEnableAll: (palettes: string[]) => void,
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
      show={show} width={35} height={33} name={t("palettesModal.modalName")}
      description={t("palettesModal.description")} onExit={onExit}
    >
      <div style={{position: "relative"}}>
        <HoveredPalette>
          {/*@ts-ignore*/}
          <PaletteName>{t(`palettes.${hoveredPalette}`)}</PaletteName>
          <WarframePalette size={1.665} paletteName={hoveredPalette} />
        </HoveredPalette>
        <ScrollableFadedList height="27em" width="100%">
          {modalPalettes.map(category => <>
            <HeaderWrapper>
              <CategoryHeader>{category.name}</CategoryHeader>
              <Divider/>
              <ActionsWrapper>
                <Button
                  round
                  small
                  onClick={() =>
                    onDisableAll(
                      category.palettes
                        .map((el) => el.kind === "group" ? el.palettes.map(({ name }) => name) : el.name)
                        .flat()
                    )
                  }
                  style={{ marginRight: '0.4em' }}
                >
                  {t("palettesModal.disableAll")}
                </Button>
                <Button
                  round
                  small
                  onClick={() =>
                    onEnableAll(
                      category.palettes
                        .map((el) => el.kind === "group" ? el.palettes.map(({ name }) => name) : el.name)
                        .flat()
                    )
                  }
                  style={{ marginRight: '0.4em' }}
                >
                  {t("palettesModal.enableAll")}
                </Button>
              </ActionsWrapper>
            </HeaderWrapper>
            <Grid dir="">
              {sortBy(category.palettes, ['name']).map(el => {
                if (el.kind === "group") {
                  const palettes = el.palettes.map(({ name }) => name)
                  const enabled = palettes.some(name => availablePalettes.includes(name));
                  return <GroupWrapper>
                    <GroupHeader>{el.name}</GroupHeader>
                    <GroupList>
                      <GroupLine>
                        <GroupButton
                          enabled={enabled}
                          onClick={() => enabled ? onDisableAll(palettes) : onEnableAll(palettes)}
                        />
                      </GroupLine>
                      <GroupListItems>
                        {el.palettes.map((el) => (
                          <Button round small
                            onClick={() => onPaletteClick(el.name)} onMouseOver={() => setHoveredPalette(el.name)}
                            success={availablePalettes.indexOf(el.name) !== -1}
                          >
                            {/*@ts-ignore*/}
                            {stringEllipsis(t(`palettes.${el.name}`) as string, 21)}
                          </Button>
                        ))}
                      </GroupListItems>
                    </GroupList>
                  </GroupWrapper>
                }
                return <Button round small
                  onClick={() => onPaletteClick(el.name)} onMouseOver={() => setHoveredPalette(el.name)}
                  success={availablePalettes.indexOf(el.name) !== -1}
                >
                  {/*@ts-ignore*/}
                  {stringEllipsis(t(`palettes.${el.name}`) as string, 21)}
                </Button>
              })}

            </Grid>
        </>)}
        </ScrollableFadedList>
        <Divider />
        <PaletteDescription>
          {(assign({} , ...Object.values(paletteDescriptions)) as Record<string, string>)[hoveredPalette]}
        </PaletteDescription>
      </div>
    </Modal>

  )
}

const PaletteDescription = styled.p`
  position: relative;
  top: -0.5em;
  height: 2em;
  font-size: 0.8rem;
`

const GroupHeader = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1;
  margin-bottom: 0.184em;
`

const GroupLine = styled.div`
  position: relative;
  content: " ";
  margin: 0.45em 0.4em;
  margin-right: 0.1em;
  min-height: 100%;
  width: 0.4em;
  border: solid 0.2em;
  border-right-style: none;
  border-top-left-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
  border-color: ${props => props.theme.colors.misc};
`

const GroupButton = styled.button<{enabled: boolean}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% - 0.4em / 2), calc(-50%));

  height: 20px;
  width: 20px;
  padding: 0;
  appearance: none;
  outline: none;
  border: solid 4px;
  border-radius: 50%;
  cursor: pointer;
  &::after {
    position: absolute;
    transform: translate(calc(-50%), calc(-50%));
    top: 50%;
    left: 50%;
    content: " ";
    min-height: 75%;
    min-width: 75%;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.success};
    opacity: ${({enabled}) => enabled ? 1 : 0};
    transition: opacity 0.2s all;
  }
  border-color: ${({theme}) => theme.colors.misc};
  background-color: ${({theme}) => theme.colors.background};
`

const GroupList = styled.div`
  display: flex;
  align-items: stretch;
  gap: 4px;
`
const GroupListItems = styled.div`
  break-inside: avoid;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const GroupWrapper = styled.div`
  break-inside: avoid;

`

const CategoryHeader = styled.h2`
  flex-shrink: 0;
  font-size: 1rem;
  margin: 0;
  color: ${({theme}) => theme.colors.textOnBackground};
`

const ActionsWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  * {
  }
`


const HeaderWrapper = styled.div`
  padding-right: 0.4em;
  padding-bottom: 0.6em;
  width: 100%;
  align-items: center;
  display: flex;
  gap: 0.4em;
  justify-content: space-between;
`

const HoveredPalette  = styled.div`
  position: absolute;
  right: -11.7em;
  top: -2.39em;
  border: 4px solid ${props => props.theme.colors.buttons};
  padding: 0.4em 0.6em;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 0.8em;
`

const PaletteName = styled.div`
  text-align: center;
  font-size: 0.655rem;
  text-transform: uppercase;
  border-radius: 0.5em;
  padding: 0.5em 0;
  margin-bottom: 0.5em;
  margin-top: 0.4em;
  font-weight: bold;
  border: 0.15em solid ${props => props.theme.colors.misc};
  color: ${props => props.theme.colors.textOnBackground};
`


const Grid = styled.div`
  column-count: 3;
  margin-bottom: 0.8em;
  padding-right: 0.4em;
  & > * + * {
    margin-top: 4px;
  }
  color: ${props => props.theme.colors.textOnBackground};
`
