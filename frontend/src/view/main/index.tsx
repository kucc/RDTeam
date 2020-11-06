import React, { useState, useEffect } from "react";
import * as S from "./styles";
import axios from "axios";

interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

interface MainProps {
  user: playersProps;
  setUser: (user: playersProps) => void;
  roomcode: string;
  setRoomcode: (roomcode: string) => void;
  startGame: () => void;
}

function Main({ user, setUser, roomcode, setRoomcode, startGame }: MainProps) {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleRoomcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomcode(e.target.value);
  };

  const makeRoom = async () => {
    axios
      .post(
        "https://realdragon.herokuapp.com/room",
        { nickname: nickname },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setRoomcode(data.roomCode);
        setUser({ nickname: nickname, userId: data.userId, state: "ALIVE" });
        setLoading(true);
      })
      .then(() => {
        startGame();
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const enterRoom = async () => {
    axios
      .post(
        "https://realdragon.herokuapp.com/room/enter",
        {
          roomCode: roomcode,
          nickname: nickname,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setLoading(true);
        setUser({
          nickname: nickname,
          userId: data.userId,
          state: "ALIVE",
        });
      })
      .then(() => {
        startGame();
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };
  return (
    <>
      <S.Main>
        <S.WaveContainer>
          <S.Wave url={`${process.env.PUBLIC_URL}/assets/wave.png`} />
        </S.WaveContainer>
        <S.Comment>
          <span style={{ color: "#900" }}>박</span>력있는{" "}
          <span style={{ color: "#900" }}>진</span>짜 어른
          <span style={{ color: "#900" }}>용</span> 게임
        </S.Comment>
        <S.Title>
          <span style={{ color: "#900" }}>박진용</span>🐉게임
        </S.Title>
        <S.InputContainer>
          <S.Label>닉네임</S.Label>
          <S.ChatInput
            type="text"
            placeholder="10자 이내로 입력하세요"
            maxLength={10}
            onChange={handleNicknameChange}
          />
        </S.InputContainer>
        <S.InputContainer>
          <S.Label>방 코드</S.Label>
          <S.ChatInput
            type="text"
            placeholder="방 코드를 입력하세요"
            maxLength={10}
            onChange={handleRoomcodeChange}
          />
        </S.InputContainer>
        <S.ButtonContainer>
          <S.RoomButton onClick={makeRoom}>방 생성하기</S.RoomButton>
          <S.RoomButton onClick={enterRoom}>방 입장하기</S.RoomButton>
        </S.ButtonContainer>
        <S.Credit>
          ⓒ 2021. 팀 박진용 all rights reserved.
          <br />
          <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>
            14 김수홍, 17 최하민, 19 김현채
          </span>
        </S.Credit>
      </S.Main>
    </>
  );
}

export default Main;
