import React, {CSSProperties, ReactNode} from "react";
import styled from "styled-components";

export const Wires = (
  {
    children,
    style,
    src
  }: {
    style: CSSProperties,
    src: string,
    children: ReactNode
  }
) => <div style={{position: 'relative'}}>
  {children}
  <StyledWires style={style} src={src} alt=""/>
</div>

const StyledWires = styled.img`
  position: absolute;
  user-select: none;
  pointer-events: none
`
