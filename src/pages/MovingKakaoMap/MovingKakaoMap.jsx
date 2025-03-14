import React, {useEffect, useState} from "react";
import * as styled from "./styles";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";

const { kakao } = window;

const MovingKakaoMap = () => {
    const [place, setPlace] = useState("");
    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(33.450701, 126.570667),
            level : 2
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(place, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            }
        }
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:2px;font-size:12px;" >' + place.place_name + '</div>');
                infowindow.open(map, marker);
                sessionStorage.setItem('place', JSON.stringify(
                    {
                        // id : place.id,
                        address : place.address_name,
                        latitude : place.y,
                        longitude : place.x,
                        name : place.place_name}))
            });

        }
    }, [place]);

    return (
        <styled.MapContainer>
            <TopNavBar pageName={"장소 선택"}
                       feature={"done"}
                       dest={-1}
                       isModalRequired={false}
                       isBackRequired={true}/>
            <styled.MapContentsContainer>
                <DarkBlueWriteBox feature={"search"} onDataChange={() => setPlace(sessionStorage.getItem("placeSearch"))}/>
                <div id="map" style={{
                    width: '90%',
                    height: '100%',
                    borderRadius: '10px',
                    zIndex: '-1',
                    marginTop: '10px'
                }}></div>
            </styled.MapContentsContainer>
        </styled.MapContainer>
    )
}

export default MovingKakaoMap;
