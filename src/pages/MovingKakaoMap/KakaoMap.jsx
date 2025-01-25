import React, {useEffect} from "react";
import * as styled from "./styles";


const { kakao } = window;

const KakaoMap = ({lat, lon, pName}) => {

    useEffect(() => {
        var markerPosition = new kakao.maps.LatLng(lat,lon);
        var marker = {
            position: markerPosition,
            text : pName
        };
        var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
            staticMapOption = {
                center: new kakao.maps.LatLng(lat,lon), // 이미지 지도의 중심좌표
                level: 3, // 이미지 지도의 확대 레벨
                marker : marker
            };
        var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

    }, []);

    return (
        <styled.MapContainerSmall>
            <styled.MapContentsContainer>
                <div id="staticMap" style={{width: '100%', height: '100%', borderRadius : '10px'}}/>
            </styled.MapContentsContainer>
        </styled.MapContainerSmall>


    )
}

export default KakaoMap;
