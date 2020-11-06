import React, { useState } from "react";
import * as S from "./styles";
import { COLOR } from "../../constant";
import axios from "axios";

interface GuideProps {
  userId: string;
  roomcode: string;
  isManager: boolean;
  isMafia: boolean;
  now: string;
  keyword: string;
  voteIndex: number;
  setVoteIndex: (n: number) => void;
}

function Guide({
  userId,
  roomcode,
  isManager,
  now,
  isMafia,
  keyword,
  voteIndex,
  setVoteIndex,
}: GuideProps) {
  const [loading, setLoading] = useState(false);
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
      .then(() => {
        setLoading(true);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };
  const vote = async () => {
    axios
      .post(
        "https://realdragon.herokuapp.com/game/start",
        {
          roomCode: roomcode,
          userId: userId,
        },
        { withCredentials: true }
      )
      .then(() => {
        setLoading(true);
        setVoteIndex(-1);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
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
                  <S.Button onClick={startGame}>게임 시작</S.Button>
                ) : (
                  <>방장이 게임을 시작하기를 기다려주세요.</>
                )}
              </S.Comment>
            </>
          ) : now === "VOTING" ? (
            <>
              <S.Text>
                누가 <span style={{ fontWeight: 800 }}>마피아</span>일까요?
              </S.Text>
              <S.Button
                 isBlank={voteIndex == -1}
                onClick={() => {
                  if (voteIndex != -1) vote();
                }}
              >
                투표 완료
              </S.Button>
            </>
          ) : (
            <>
              <S.Text>
                당신은{" "}
                <S.RoleText isMafia={isMafia}>
                  {isMafia ? "마피아" : "시민"}
                </S.RoleText>
                입니다.
              </S.Text>
              <S.Comment>
                {isMafia ? (
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
