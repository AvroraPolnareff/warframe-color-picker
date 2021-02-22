import React, {CSSProperties, FC} from "react";
import styled from "styled-components";

export const Wires: FC<{ style: CSSProperties, src: string }> = ({children, style, src}) => (
  <div style={{position: 'relative'}}>
    {children}
    <StyledWires style={style} src={src}/>
  </div>
)

const StyledWires = styled.img`
  position: absolute;
  user-select: none;
  pointer-events: none
`