import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

function Player() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<playersProps[]>([]);
  const loadCharacters = async () => {
    axios
      .get("./room?code={roomCode}&userId={userId}")
      .then(({ data }) => {
        setLoading(true);
        setPlayers(data.users);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    loadCharacters();
  });
  return (
    <>
      <S.Layout>
        <S.Player>
          {loading ? (
            <S.PlayerCharacterWrapper>
              {players.map((player, i) => {
                return (
                  <>
                    <S.PlayerCharacterContainer>
                      <S.PlayerName isAlive={player.state == "ALIVE"}>
                        {player.nickname}
                      </S.PlayerName>
                      <S.PlayerCharacter
                        src={`${process.env.PUBLIC_URL}/assets/${i}.png`}
                        index={i}
                        isAlive={player.state == "ALIVE"}
                      />
                      <S.Bubble>파란색입니다람쥐썬더</S.Bubble>
                    </S.PlayerCharacterContainer>
                  </>
                );
              })}
            </S.PlayerCharacterWrapper>
          ) : (
            <></>
          )}
        </S.Player>
      </S.Layout>
    </>
  );
}

export default Player;
