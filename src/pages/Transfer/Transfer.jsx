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
import Withdrawal from "../../assets/Budget/withdrawal.svg";
import Deposit from "../../assets/Budget/deposit.svg";
import OneButton from "../../components/Button/OneButton";

const Transfer = () => {
    const {meetingId} = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMeetingData(json)
            })
            .catch((error) => {
                console.log(error)
            });

        fetch(`http://localhost:8000/members?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMemberData(json)
            })
            .catch((error) => {
                console.log(error)
            });


    }, []);

    const transactions = [
        { id: 1, type: 'income', image: Withdrawal, description: '1차 회비', amount: '+500,000' },
        { id: 2, type: 'outcome', image: Deposit, description: '1일차 점심', amount: '-150,000', memo: '명동교자 단체 식사'},
        { id: 3, type: 'income', image: Withdrawal, description: '2차 회비', amount: '+1,500,000' },
        { id: 4, type: 'income', image: Withdrawal, description: '호텔 환불', amount: '+800,000' }
    ];

    if(meetingData && memberData){
        Object.assign(meetingData[0],memberData[0]);
    }
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
                                                 eventTitle={elements.title}/>
                                {elements.isManager ?
                                    <>
                                        <textStyle.TextWrapper>
                                            <textStyle.TextBox style={{lineHeight: "60px"}}>거래 내역</textStyle.TextBox>
                                        </textStyle.TextWrapper>
                                        <budgetStyle.HistoryContainer style={{width: "100%", gap: "10px"}}>
                                            {transactions && transactions.map(elements => (
                                                <Button
                                                    key={elements.id}
                                                    width={'100%'}
                                                    height={'80px'}
                                                    name={elements.type}
                                                    image={elements.image}
                                                    description={elements.description}
                                                    amount={elements.amount}
                                                    memo={elements.memo}
                                                    onClick={() => navigate(`/history/${elements.id}`, {state: elements})}
                                                />
                                            ))}
                                        </budgetStyle.HistoryContainer>
                                        <textStyle.TextWrapper style={{width : "100%",height: "80px", display : "flex", justifyContent :"space-around"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>총 수입</textStyle.TextBox>
                                            <textStyle.TextBox style={{color: "#0234A8"}}>+1,500,000원</textStyle.TextBox>

                                        </textStyle.TextWrapper>

                                        <textStyle.TextWrapper style={{width: "100%" , justifyContent :"space-around"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>총 지출</textStyle.TextBox>
                                            <textStyle.TextBox style={{color: "#A80202"}}>-1,650,000원</textStyle.TextBox>

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
                                            <textStyle.TextBox style={{color: "#A80202"}}>-150,000원</textStyle.TextBox>
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
                                        <textStyle.TextWrapper style={{width: "100%", justifyContent: "center"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>누구에게 정산요청 할까요?
                                            </textStyle.TextBox>
                                        </textStyle.TextWrapper>

                                        <TwoButtons ButtonColor={"#E7EBF7"}
                                                    TextColor={"black"}
                                                    ButtonText1={"모두에게"}
                                                    ButtonIcon={"all"}
                                                    Dest={`managemeeting/${elements.id}/edit`}
                                                    ButtonText2={"선택된 멤버만"}
                                                    ButtonIcon2={"select"}
                                                    Dest2={""}/>
                                    </>
                                    :
                                    <>
                                        <textStyle.TextWrapper>
                                            <textStyle.TextBox style={{lineHeight: "60px"}}>정산 금액</textStyle.TextBox>
                                        </textStyle.TextWrapper>
                                        <OneButton ButtonColor={"#E7EBF7"}
                                                   ButtonText1={"5000원"}/>
                                        <textStyle.TextWrapper style={{height: "80px"}}>
                                            <textStyle.TextBox style={{fontWeight: "bold"}}>송금 방법</textStyle.TextBox>
                                        </textStyle.TextWrapper>

                                        <TwoButtons ButtonColor={"#E7EBF7"}
                                                    TextColor={"black"}
                                                    ButtonText1={"토스"}
                                                    Dest={`managemeeting/${elements.id}/edit`}
                                                    ButtonText2={"카카오페이"}
                                                    Dest2={""}/>
                                        <OneButton ButtonColor={"#E7EBF7"}
                                                   ButtonText1={"계좌이체"}
                                                   ButtonText2={"계좌번호 복사하기"}/>
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
