import React, { useState } from "react";
import * as S from "./styles";
import axios from "axios";

interface PopUpProps {
  roomcode: string;
  userId: string;
  isMafia: boolean;
  keyword: string;
  isGuessing: boolean;
  setResult: (s: string) => void;
}

function PopUp({
  roomcode,
  userId,
  isMafia,
  keyword,
  isGuessing,
  setResult,
}: PopUpProps) {
  const [chatText, setChatText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };
  const onSubmit = async () => {
    axios
      .post(
        `https://realdragon.herokuapp.com/description`,
        { roomCode: roomcode, userId: userId, description: chatText },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {})
      .catch((e) => {
        console.error(e);
      });
  };
  const onGuess = async () => {
    axios
      .post(
        `https://realdragon.herokuapp.com/subject/guess`,
        { roomCode: roomcode, userId: userId, word: chatText },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        setResult(data.success ? "MAFIA" : "");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <S.Layout>
        <S.PopUp>
          {isMafia ? (
            isGuessing ? (
              <S.Text>제시어를 맞혀주세요!</S.Text>
            ) : (
              <S.Text>제시어를 눈치껏 유추해서 설명해주세요.</S.Text>
            )
          ) : (
            <S.Text>
              제시어 <S.KeyWord>{keyword}</S.KeyWord>을(를) 설명해주세요.
            </S.Text>
          )}
          <S.InputContainer>
            <S.ChatInput
              type="text"
              placeholder="10자 이내로 입력하세요"
              maxLength={10}
              onChange={handleChange}
            />
            <S.SendButton
              isBlank={chatText.length == 0}
              onClick={isGuessing ? onGuess : onSubmit}
            >
              확인
            </S.SendButton>
          </S.InputContainer>
        </S.PopUp>
      </S.Layout>
    </>
  );
}

export default PopUp;
