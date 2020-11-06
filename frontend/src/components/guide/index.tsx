import React, { useState } from "react";
import * as S from "./styles";
import { COLOR } from "../../constant";
import axios from "axios";

interface GuideProps {
  userId: string;
  roomcode: string;
  isManager: boolean;
  now: string;
}

function Guide({ userId, roomcode, isManager, now }: GuideProps) {
  const isMapia = false;
  const isVoting = true;
  const keyword = "박진용";
  const startGame = async () => {
    axios
      .post(
        "https://realdragon.herokuapp.com/game/start",
        {
          roomCode: roomcode,
          userId: userId,
        },
        { withCredentials: true }
      )
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <S.Layout>
        <S.Guide>
          {now === "WAITING" ? (
            <>
              <S.Text>
                당신은{" "}
                <span style={{ fontWeight: 800 }}>
                  {isManager ? "방장" : "안방장"}
                </span>
                입니다.
              </S.Text>
              <S.Comment>
                {isManager ? (
                  <S.GameStartButton onClick={startGame}>
                    게임 시작
                  </S.GameStartButton>
                ) : (
                  <>방장이 게임을 시작하기를 기다려주세요.</>
                )}
              </S.Comment>
            </>
          ) : isVoting ? (
            <>
              <S.Text>
                누가 <span style={{ fontWeight: 800 }}>마피아</span>일까요?
              </S.Text>
            </>
          ) : (
            <>
              <S.Text>
                당신은{" "}
                <S.RoleText isMapia={isMapia}>
                  {isMapia ? "마피아" : "시민"}
                </S.RoleText>
                입니다.
              </S.Text>
              <S.Comment>
                {isMapia ? (
                  "눈치껏 제시어를 맞혀 보세요."
                ) : (
                  <>
                    제시어는 <span style={{ fontWeight: 800 }}>{keyword}</span>
                    입니다.
                  </>
                )}
              </S.Comment>
            </>
          )}
        </S.Guide>
      </S.Layout>
    </>
  );
}

export default Guide;
