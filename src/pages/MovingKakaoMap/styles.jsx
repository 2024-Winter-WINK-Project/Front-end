import styled from "styled-components";

export const MapContainer = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;

    @media (min-width: 600px){
        width : 600px;
    }
`;

export const MapContainerSmall = styled.div`
    width: 100vw;
    height: 300px;
    display: flex;
    justify-content: center;

    @media (min-width: 600px){
        width : 600px;
    }
`;

export const MapContentsContainer = styled.div`
    width: 90%;
    height: 95%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    z-index: 0;
`;
