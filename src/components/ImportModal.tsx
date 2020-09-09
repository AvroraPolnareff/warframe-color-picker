import React, {FC, useRef, useState} from "react";
import styled from "styled-components";
import {Modal} from "./shared/Modal";
import {Button} from "./shared/Button";
import {colorsFromImage} from "../common/helpers";

interface ImportModalProps {
  show: boolean,
  onAccept: (importData: string) => void
  onExit: () => void
  onScreenshotImport: (colors: string[]) => void
}

export const ImportModal: FC<ImportModalProps> = ({show, onAccept, onExit, onScreenshotImport}) => {
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
  
  
  return (
    <Modal show={show} width={27} name={"Scheme Import"} description={"Insert the code below"} onExit={onExit}>
      <TextArea onChange={e => setContent(e.target.value)} value={content} onPaste={onPaste}/>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{textAlign: "left"}}>
          <input ref={inputRef} type="file" style={{position: "fixed", top: -100}} onChange={onScreenshotImportChange}
                 name="screenshot" id="screenshot"/>
  
          <Button as="label" htmlFor="screenshot"  round small>From Screenshot</Button>
        </div>
        <div style={{textAlign: "right"}}>
          
          <Button round small warning onClick={() => setContent("")} style={{marginRight: '0.4em'}}>clear</Button>
          <Button round small primary onClick={() => onAccept(content)}>accept</Button>
        </div>
      </div>
    </Modal>
  )
}

const TextArea = styled.textarea.attrs(props => ({
  rows: 3, autofocus: "true", placeholder: "Paste your code or scheme screenshot here...", spellCheck: "false"
}))`
  border: none;
  margin: 0;
  width: 100%;
  height: 4em;
  resize: none;
  outline: none;
  color: ${props => props.theme.colors.darken.secondary};
  overflow: hidden;
  
  &:focus {
    border: none;
  }
`

