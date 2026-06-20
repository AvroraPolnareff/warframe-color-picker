import React, {useRef, useEffect, RefObject} from "react";
import styled, {useTheme} from "styled-components";
import {Scrollbars, positionValues} from "./scrollbars";

interface ScrollableFadedListProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
  onUpdate?: (values: positionValues) => void;
  scrollbarsRef?: RefObject<Scrollbars>;
}

export const ScrollableFadedList = ({
  children,
  height = "32.55em",
  width = "104%",
  onUpdate,
  scrollbarsRef
}: ScrollableFadedListProps) => {
  const fadesRef = useRef<HTMLDivElement>(null);
  const {colors} = useTheme();

  const handleUpdate = (values: positionValues) => {
    if (!fadesRef.current) return;

    const fadesStyle = `
      position: absolute;
      height: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      pointer-events: none;
    `;
    const gradient = `background: linear-gradient(
      0deg, ${colors.background} 0%, rgba(0,0,0,0) ${(1 - values.top) * 20}%,
      rgba(0,0,0,0) ${100 - (values.top) * 20}%, ${colors.background} 100%
    )`;

    fadesRef.current.setAttribute("style", fadesStyle + gradient);
    
    onUpdate?.(values);
  };

  return (
    <Faded>
      <Scrollbars
        style={{height, width}}
        autoHide
        autoHideDuration={200}
        universal
        ref={scrollbarsRef}
        onUpdate={handleUpdate}
      >
        {children}
      </Scrollbars>
      <div ref={fadesRef}/>
    </Faded>
  );
};

const Faded = styled.div`
  margin-top: 0.5em;
  position: relative;
`;
