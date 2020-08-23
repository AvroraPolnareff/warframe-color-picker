import styled, {css} from "styled-components";



export const Badge = styled.div<{color?: string, width?: number, hoverable?: boolean, selected?: boolean}>`
    background-color: ${props => props.color || props.theme.colors.secondary};
    ${props => props.selected && ("background-color: " + props.theme.colors.primary)};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.02rem 0.3rem;
    max-height: 1.1rem;
    margin: 0 0.2rem;
    text-align: right;
    border-radius: 0.6rem;
    font-weight: 600;
    ${props => props.width && `width: ${props.width}rem`};
    
    ${props => props.hoverable && css`
   
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      
    }
    `}
    
    
`;

