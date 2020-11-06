import React, { useState } from "react";
import * as S from "./styles";

function Player() {
  const [players, setPlayers] = useState([
    {
      userId: 0,
      name: "김토끼",
      isManager: false,
      isMapia: false,
      isDead: false,
    },
    {
      userId: 1,
      name: "토순이",
      isManager: false,
      isMapia: false,
      isDead: false,
    },
    {
      userId: 2,
      name: "우리집강아지",
      isManager: true,
      isMapia: false,
      isDead: false,
    },
    {
      userId: 3,
      name: "나는고양이",
      isManager: false,
      isMapia: false,
      isDead: true,
    },
    {
      userId: 4,
      name: "난그건별루..",
      isManager: false,
      isMapia: true,
      isDead: false,
    },
    {
      userId: 5,
      name: "치킨먹고싶다",
      isManager: false,
      isMapia: true,
      isDead: false,
    },
    {
      userId: 6,
      name: "배고파",
      isManager: false,
      isMapia: false,
      isDead: false,
    },
    {
      userId: 7,
      name: "게임잼123조아",
      isManager: false,
      isMapia: false,
      isDead: true,
    },
  ]);
  return (
    <>
      <S.Layout>
        <S.Player>
          <S.PlayerCharacterWrapper>
            {players.map((player, i) => {
              return (
                <>
                  <S.PlayerCharacterContainer>
                    <S.PlayerName>{player.name}</S.PlayerName>
                    <S.PlayerCharacter
                      src={`${process.env.PUBLIC_URL}/assets/${i}.png`}
                      index={i}
                      isDead={player.isDead}
                    />
                    <S.Bubble>파란색입니다람쥐썬더</S.Bubble>
                  </S.PlayerCharacterContainer>
                </>
              );
            })}
          </S.PlayerCharacterWrapper>
        </S.Player>
      </S.Layout>
    </>
  );
}

export default Player;
