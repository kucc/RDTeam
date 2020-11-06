import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

interface subjectDescriptionProps {
  userId: string;
  description: string;
}

interface PlayerProps {
  userId: string;
  roomcode: string;
}

function Player({ userId, roomcode }: PlayerProps) {
  const [loading, setLoading] = useState(false);
  const isVoting = true;
  const [voteIndex, setVoteIndex] = useState(1);
  const [players, setPlayers] = useState<playersProps[]>([]);
  const [description, setDescription] = useState<subjectDescriptionProps[]>([]);
  const [currentDescriber, setCurrentDescriber] = useState("");
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
        //setDescription(data.game.subjectDescription);
        //setCurrentDescriber(data.game.currentDescriber);
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
                      isSelected={voteIndex == i && isVoting}
                      onClick={() => {
                        if (player.state === "ALIVE") setVoteIndex(i);
                      }}
                      key={i}
                    >
                      <S.PlayerName isAlive={player.state !== "ALIVE"}>
                        {player.nickname}
                      </S.PlayerName>
                      <S.PlayerCharacter
                        src={`${process.env.PUBLIC_URL}/assets/${i}.png`}
                        index={i}
                        isAlive={player.state !== "ALIVE"}
                      />
                      {description[i] ? (
                        <S.Bubble>{description[i].description}</S.Bubble>
                      ) : currentDescriber === players[i].userId ? (
                        <>
                          <S.Bubble>
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/texting.gif`}
                              width="100%"
                            />
                          </S.Bubble>
                        </>
                      ) : (
                        <></>
                      )}
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
