import React, {CSSProperties, ReactNode} from "react";
import styled from "styled-components";
import InlineSVG from "react-inlinesvg";

export const Wires = (
  {
    children,
    style,
    src,
  }: {
    style: CSSProperties,
    src: string,
    children: ReactNode
  }
) => <div style={{position: 'relative'}}>
  {children}
  <StyledWires style={style} src={src}/>
</div>

const StyledWires = styled(InlineSVG)`
  user-select: none;
  pointer-events: none;
  position: absolute;

  .red {
    stroke: ${({theme}) => theme.colors.danger};
  }
  .green {
    stroke: ${({theme}) => theme.colors.success};
  }
  .blue {
    stroke: ${({theme}) => theme.colors.link};
  }
`
