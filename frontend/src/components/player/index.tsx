import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

interface PlayerProps {
  userId: string;
  roomcode: string;
  isVoting: boolean;
  descriptions: { userId: string; description: string }[];
  voteId: string;
  currentDescriber: string;
  setVoteId: (s: string) => void;
}

function Player({
  userId,
  roomcode,
  isVoting,
  descriptions,
  voteId,
  currentDescriber,
  setVoteId,
}: PlayerProps) {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<playersProps[]>([]);
  const loadCharacters = async () => {
    axios
      .get(
        `https://realdragon.herokuapp.com/room?roomCode=${roomcode}&userId=${userId}`,
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        setPlayers(data.users);
        setLoading(true);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    const interval = setInterval(loadCharacters, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <S.Layout>
        <S.Player>
          {loading ? (
            <S.PlayerCharacterWrapper>
              {players.map((player, i) => {
                return (
                  <>
                    <S.PlayerCharacterContainer
                      isSelected={voteId == player.userId && isVoting}
                      onClick={() => {
                        if (player.state === "ALIVE") setVoteId(player.userId);
                      }}
                      key={i}
                    >
                      <S.PlayerName isDead={player.state !== "ALIVE"}>
                        {player.nickname}
                      </S.PlayerName>
                      <S.PlayerCharacter
                        src={`${process.env.PUBLIC_URL}/assets/${i}.png`}
                        index={i}
                        isDead={player.state !== "ALIVE"}
                      />
                      {currentDescriber === player.userId && !isVoting && (
                        <S.Bubble>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/texting.gif`}
                            width="100%"
                          />
                        </S.Bubble>
                      )}
                      {descriptions.map((d, ii) => {
                        {
                          return d.userId == player.userId ? (
                            <S.Bubble>{d.description}</S.Bubble>
                          ) : (
                            <></>
                          );
                        }
                      })}
                    </S.PlayerCharacterContainer>
                  </>
                );
              })}
              {[...Array(8 - players.length)].map((n, i) => (
                <S.PlayerCharacterContainer>
                  <S.CharacterBlank
                    src={`${process.env.PUBLIC_URL}/assets/blank.gif`}
                  />
                </S.PlayerCharacterContainer>
              ))}
            </S.PlayerCharacterWrapper>
          ) : (
            <>로딩중...</>
          )}
        </S.Player>
      </S.Layout>
    </>
  );
}

export default Player;
