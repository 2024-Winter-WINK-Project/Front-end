import React, {useEffect} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}

const MapContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;

`;

const MapArea = styled.div`
    width: 90%;
    height: 95%;
    background-color: black;
    border-radius: 10px;
    z-index: 0;
`;

const { kakao } = window;

const KakaoMap = ({yPos, xPos, placeName}) => {

    useEffect(() => {
        var markerPosition = new kakao.maps.LatLng(yPos,xPos);
        var marker = {
            position: markerPosition,
            text : placeName
        };
        var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
            staticMapOption = {
                center: new kakao.maps.LatLng(yPos,xPos), // 이미지 지도의 중심좌표
                level: 3, // 이미지 지도의 확대 레벨
                marker : marker
            };
        var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    }, []);

    return (
        <>
            <Mobile>
                <MapContainer>
                    <MapArea>
                        <div id="staticMap" style={{width: '100%', height: '100%', borderRadius : '10px'}}/>
                    </MapArea>
                </MapContainer>
            </Mobile>
            <PC>
                <MapContainer>
                    <MapArea>
                        <div id="staticMap" style={{width: '100%', height: '100%', borderRadius : '10px'}}/>
                    </MapArea>
                </MapContainer>
            </PC>
        </>


    )
}

export default KakaoMap;
