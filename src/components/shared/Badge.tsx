import styled from "styled-components";



export const Badge = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.color || props.theme.colors.badge};
    color: ${props => props.theme.colors.badgeText};
    padding: 0.1rem 0.3rem;
    max-height: 1.2rem;
    margin: 0 0.2rem;
    border-radius: 0.4rem;
    font-weight: 600;
`;

