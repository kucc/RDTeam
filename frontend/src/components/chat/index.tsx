import React from "react";
import * as S from "./styles";

function Chat() {
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
            <S.ChatInput type="text" placeholder="채팅을 입력하세요" />
            <S.SendButton>전송</S.SendButton>
          </S.InputContainer>
        </S.Chat>
      </S.Layout>
    </>
  );
}

export default Chat;
