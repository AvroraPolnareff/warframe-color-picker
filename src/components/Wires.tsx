import React, {CSSProperties, ReactNode} from "react";
import styled from "styled-components";
import InlineSVG from "react-inlinesvg";

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
  <StyledWires>
    <InlineSVG src={src} style={style}/>
  </StyledWires>
</div>

const StyledWires = styled.div`
  & svg {
    position: absolute;
    user-select: none;
    pointer-events: none;
    .red {
      stroke: ${({theme}) => theme.colors.danger};
    }
    .green {
      stroke: ${({theme}) => theme.colors.success};
    }
    .blue {
      stroke: ${({theme}) => theme.colors.link};
    }
  }
  user-select: none;
  pointer-events: none
`
