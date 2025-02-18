import React, {useEffect, useState} from "react";
import * as styled from "./styles";
import * as budgetStyle from "../Budget/styles";
import * as textStyle from "../Home/styles";
import {useParams} from "react-router-dom";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import TwoButtons from "../../components/Button/TwoButtons";
import * as style from "../Budget/styles";
import Button from "../../components/Button/BudgetButton";
import OneButton from "../../components/Button/OneButton";
import expenditure from "../../icons/expenditure.png";
import income from "../../icons/income.png";
import axios from "axios";

const Transfer = () => {
    const params = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [settlementData, setSettlementData] = useState();
    const [ledgerData, setLedgerData] = useState();
    // const [ledgerDetailsData, setLedgerDetailsData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const getMemberData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}/members`,
            });

            const getMeetingData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}`,

            });

            const getSettlementData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/groups/${params.meetingId}/transfer`,
            });

            const getLedgerData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/groups/${params.meetingId}/ledger`,
            });



            if(getMeetingData.status === 200 && getMemberData.status === 200 && getSettlementData.status === 200 && getLedgerData.status === 200)
            {
                var tmpMeetingData = [];
                var tmpMemberData = [];
                var tmpSettlementData = [];
                var tmpLedgerData = [];
                tmpMeetingData.push(getMeetingData.data);
                setMeetingData(tmpMeetingData);
                tmpMemberData.push(getMemberData.data);
                setMemberData(tmpMemberData);
                tmpSettlementData.push(getSettlementData.data);
                setSettlementData(tmpSettlementData);
                tmpLedgerData.push(getLedgerData.data);
                setLedgerData(tmpLedgerData);

            }
        }
        fetchData();

    }, []);

    const handleCopy = async () => {
        try {
            if (settlementData[0].accountNumber === null){
                alert("모임장이 계좌번호를 등록하지 않았어요. 다른 방법으로 시도해 주세요.");
            }
            else{
                await window.navigator.clipboard.writeText(settlementData[0].accountNumber);
                alert('계좌번호가 복사되었습니다.');
            }

        } catch (e) {
            console.error(e);
            alert('클립보드 복사에 실패했습니다.');
        }
    };

    return(
        <>
            {meetingData && meetingData.map(elements=>(
                <styled.BodyContainer key={elements.id}>
                            <TopNavBar pageName={"정산하기"}
                                       feature={""}
                                       isModalRequired={false}
                                       isBackRequired={true}/>

                            <styled.FormContainer>
                                <DarkBlueReadBox feature={""}
                                                 boxtitle={"모임명"}
                                                 eventTitle={elements.name}/>
                                {elements.isManager ?
                                    <>
                                        <textStyle.TextWrapper>
                                            <textStyle.TextBox style={{lineHeight: "60px"}}>거래 내역</textStyle.TextBox>
                                        </textStyle.TextWrapper>
                                        <budgetStyle.HistoryContainer style={{width: "100%", gap: "10px"}}>
                                            {ledgerDetailsData && ledgerDetailsData.map(details => (
                                                <Button
                                                    key={details.id}
                                                    width={'100%'}
                                                    height={'80px'}
                                                    name={details.type}
                                                    image={details.type === "income" ? income : expenditure}
                                                    description={details.description}
                                                    amount={details.type === "income" ? `+${details.amount.toLocaleString()}원` : `-${details.amount.toLocaleString()}원`}
                                                    // memo={details.memo}
                                                    // onClick={() => navigate(`/history/${details.id}`, {state: details})}
                                                />
                                            ))}
                                        </budgetStyle.HistoryContainer>
                                        {ledgerData && ledgerData.map(details => (
                                            <div key={details.id}>
                                                <textStyle.TextWrapper style={{width : "100%",height: "80px", display : "flex", justifyContent :"space-around"}}>
                                                    <textStyle.TextBox style={{fontWeight: "bold"}}>총 수입</textStyle.TextBox>
                                                    <textStyle.TextBox style={{color: "#0234A8"}}>{details.totalIncome.toLocaleString()}원</textStyle.TextBox>

                                                </textStyle.TextWrapper>

                                                <textStyle.TextWrapper style={{width: "100%" , justifyContent :"space-around"}}>
                                                    <textStyle.TextBox style={{fontWeight: "bold"}}>총 지출</textStyle.TextBox>
                                                    <textStyle.TextBox style={{color: "#A80202"}}>{details.totalExpenditure.toLocaleString()}원</textStyle.TextBox>

                                                </textStyle.TextWrapper>
                                                <div style={{
                                                    width: "100%",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <styled.DivideLine/>
                                                </div>
                                                <textStyle.TextWrapper style={{width: "100%", height: "40px" , justifyContent :"space-around"}}>
                                                    <textStyle.TextBox style={{fontWeight: "bold", fontSize: "25px"}}>정산 금액</textStyle.TextBox>
                                                    <textStyle.TextBox style={{color: "#A80202"}}>{details.balance.toLocaleString()}원</textStyle.TextBox>
                                                </textStyle.TextWrapper>
                                            </div>
                                        ))}
                                        <div style={{
                                            width: "100%",
                                            height: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <styled.DivideLine/>
                                        </div>
                                        <textStyle.TextWrapper style={{width: "100%", justifyContent: "center"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>누구에게 정산요청 할까요?
                                            </textStyle.TextBox>
                                        </textStyle.TextWrapper>

                                        <TwoButtons ButtonColor={"#E7EBF7"}
                                                    TextColor={"black"}
                                                    ButtonText1={"모두에게"}
                                                    ButtonIcon={"all"}
                                                    Dest={""}
                                                    ButtonText2={"선택된 멤버만"}
                                                    ButtonIcon2={"select"}
                                                    Dest2={`/transfer/${elements.id}/selectmembers`}/>
                                    </>
                                    :
                                    <>
                                        <textStyle.TextWrapper>
                                            <textStyle.TextBox style={{lineHeight: "60px"}}>정산 금액</textStyle.TextBox>
                                        </textStyle.TextWrapper>
                                        <OneButton ButtonColor={"#E7EBF7"}
                                                   ButtonText1={"5000원"}
                                                    TextColor={"#0234A8"}/>
                                        <textStyle.TextWrapper style={{height: "80px"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>송금 방법</textStyle.TextBox>
                                        </textStyle.TextWrapper>

                                        <TwoButtons ButtonColor={"#E7EBF7"}
                                                    TextColor={"black"}
                                                    ButtonText1={"토스"}
                                                    Dest={settlementData[0].tossUrl}
                                                    ButtonText2={"카카오페이"}
                                                    Dest2={settlementData[0].kakaoUrl}
                                                    Type={"URL"}
                                                    isModalRequired={false}
                                                    />
                                        <div onClick={handleCopy}>
                                            <OneButton ButtonColor={"#E7EBF7"}
                                                       ButtonText1={"계좌이체"}
                                                       ButtonText2={"계좌번호 복사하기"}
                                                       isCopyRequired={true}/>
                                        </div>
                                        <textStyle.TextWrapper style={{width : "100%",height: "80px"}}>
                                            <textStyle.TextBox style={{lineHeight : "20px",fontSize : "15px", color : "gray"}}>카카오페이 송금코드와 토스 송금코드는 해당 서비스 이용자만 가능해요.</textStyle.TextBox>
                                        </textStyle.TextWrapper>
                                    </>

                                }

                            </styled.FormContainer>


                </styled.BodyContainer>
            ))}
        </>
    )
}

export default Transfer;
