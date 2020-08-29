import React, {FC,  useState} from "react";
import styled from "styled-components";
import {Modal} from "./shared/Modal";
import {Button} from "./shared/Button";

interface ImportModalProps {
  show: boolean,
  onAccept: (importData: string) => void
  onExit: () => void
}

export const ImportModal : FC<ImportModalProps> = ({show, onAccept, onExit}) => {
  const [content, setContent] = useState("")
  
  
  return (
    <Modal show={show} width={27}  name={"Scheme Import"} description={"Insert the code below"} onExit={onExit}>
      <TextArea onChange={e => setContent(e.target.value)} value={content}/>
      <div style={{textAlign: "right"}}>
        <Button round small warning onClick={() => setContent("")} style={{marginRight: '0.4em'}}>clear</Button>
        <Button round small primary onClick={() => onAccept(content)}>accept</Button>
      </div>
    </Modal>
  )
}

const TextArea = styled.textarea.attrs(props => ({
  rows: 3, autofocus: "true", placeholder: "Insert your code...", spellCheck: "false"
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

