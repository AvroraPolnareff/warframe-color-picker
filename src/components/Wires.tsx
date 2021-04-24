import React, {CSSProperties, FC, ReactNode} from "react";
import styled from "styled-components/macro";

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
  <StyledWires style={style} src={src}/>
</div>

const StyledWires = styled.img`
  position: absolute;
  user-select: none;
  pointer-events: none
`
