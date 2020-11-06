import React, { useState } from "react";
import * as S from "./styles";

function PopUp() {
  const isMapia = false;
  const keyword = "박진용";
  const [chatText, setChatText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };
  const onSubmit = () => {};
  return (
    <>
      <S.Layout>
        <S.PopUp>
          {isMapia ? (
            <S.Text>제시어를 눈치껏 유추해서 설명해주세요.</S.Text>
          ) : (
            <S.Text>
              제시어 <S.KeyWord>{keyword}</S.KeyWord>을 설명해주세요.
            </S.Text>
          )}
          <S.InputContainer>
            <S.ChatInput
              type="text"
              placeholder="10자 이내로 입력하세요"
              maxLength={10}
              onChange={handleChange}
            />
            <S.SendButton isBlank={chatText.length == 0} onClick={onSubmit}>
              확인
            </S.SendButton>
          </S.InputContainer>
        </S.PopUp>
      </S.Layout>
    </>
  );
}

export default PopUp;
