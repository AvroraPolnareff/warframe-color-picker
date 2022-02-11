import React, {HTMLProps, ReactNode, useRef, useState} from "react";
import styled from "styled-components";
import {Modal} from "./shared/Modal";
import {Button} from "./shared/Button";
import {colorsFromImage} from "../common/helpers";
import {useTranslation} from "react-i18next";

interface ImportModalProps {
  show: boolean,
  onAccept: (importData: string) => void
  onExit: () => void
  onScreenshotImport: (colors: string[]) => void
}

export const ImportModal = (
  {
    show,
    onAccept,
    onExit,
    onScreenshotImport
  }: ImportModalProps
) => {
  const [content, setContent] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);

  const onScreenshotImportChange = () => {
    if (!inputRef.current || !inputRef.current.files) return
    const file = inputRef.current?.files[0]
    if (!file) return;
    const reader = new FileReader()
    reader.onload = (ev => {
      const img = new Image()
      if (!ev.target?.result) return
      img.onload = () => onScreenshotImport(colorsFromImage(img))
      img.src = ev.target.result as string

      if (!inputRef.current) return;
      inputRef.current.value = ""
    })
    reader.readAsDataURL(file)
  }


  const onPaste = (ev: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!ev.clipboardData) return
    const item = ev.clipboardData.items[0]

    if (item.type.indexOf("image") === 0) {
      const blob = item.getAsFile()
      if (!blob) return;

      const reader = new FileReader()
      reader.onload = (ev => {
        const img = new Image()
        if (!ev.target?.result) return
        img.onload = () => onScreenshotImport(colorsFromImage(img))
        img.src = ev.target.result as string
      })
      reader.readAsDataURL(blob)
    }
  }

  const {t} = useTranslation()

  return (
    <Modal
      show={show}
      width={27}
      name={t("importModal.modalName")}
      description={t("importModal.description")}
      onExit={onExit}
    >
      {/*@ts-ignore*/}
      <TextArea onChange={e => setContent(e.target.value)} value={content} onPaste={onPaste}>
        {t("importModal.textArea", {returnObjects: true})[0]}
        <span style={{color: "#A3A3DB"}}>{t("importModal.textArea", {returnObjects: true})[1]}</span>
        {t("importModal.textArea", {returnObjects: true})[2]}
        <span style={{color: "#A3A3DB"}}>{t("importModal.textArea", {returnObjects: true})[3]}</span>
        {t("importModal.textArea", {returnObjects: true})[4]}
      </TextArea>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{textAlign: "left"}}>
          <input
            ref={inputRef}
            type="file"
            style={{position: "fixed", top: -100}}
            onChange={onScreenshotImportChange}
            name="screenshot" id="screenshot"
          />
          <Button as="label" htmlFor="screenshot" round small>{t("importModal.manualUpload")}</Button>
        </div>
        <div style={{textAlign: "right"}}>

          <Button
            round small warning
            onClick={() => setContent("")}
            style={{marginRight: '0.4em'}}
          >
            {t("importModal.clear")}
          </Button>
          <Button round small primary onClick={() => onAccept(content)}>{t("importModal.accept")}</Button>
        </div>
      </div>
    </Modal>
  )
}

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  children: ReactNode
}

const TextArea = ({children, ...props}: TextAreaProps) => {
  const [placeholder, setPlaceholder] = useState(true)

  return (
    <Relative>
      <StyledTextArea
        onChange={props.onChange}
        value={props.value}
        onPaste={props.onPaste}
        onFocus={() => setPlaceholder(false)}
        onBlur={() => setPlaceholder(true)}
      />
        <Placeholder style={{display: placeholder? "block" : "none"}}>{children}</Placeholder>
    </Relative>
  )
}

const Relative = styled.div`
  position: relative;
  color: ${props => props.theme.colors.darken.secondary};
`

const StyledTextArea = styled.textarea.attrs(() => ({
  rows: 3, autoFocus: true,
  spellCheck: "false"
}))`
  border: none;
  margin: 0;
  width: 100%;
  height: 4em;
  resize: none;
  outline: none;
  color: ${props => props.theme.colors.darken.secondary};
  overflow-y: auto;
  
  &:focus {
    border: none;
  }
`

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
