import React, { useState } from "react";
import * as S from "./styles";

function Chat() {
  const [chatText, setChatText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };
  return (
    <>
      <S.Layout>
        <S.Chat>
          <S.ChatLog>
            <S.NickName>닉네임 : </S.NickName>
            채팅채팅채팅채팅채팅채팅채팅채팅채팅
          </S.ChatLog>
          <S.ChatLog>
            <S.NickName>닉네임 : </S.NickName>
            채팅채팅채팅채팅채팅채팅채팅채팅채팅
          </S.ChatLog>
          <S.ChatLog>
            <S.NickName>닉네임 : </S.NickName>
            채팅채팅채팅채팅채팅채팅채팅채팅채팅
          </S.ChatLog>
          <S.InputContainer>
            <S.ChatInput
              type="text"
              placeholder="채팅을 입력하세요"
              onChange={handleChange}
            />
            <S.SendButton isBlank={chatText.length == 0}>전송</S.SendButton>
          </S.InputContainer>
        </S.Chat>
      </S.Layout>
    </>
  );
}

export default Chat;
