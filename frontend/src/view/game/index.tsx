import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

import Player from "../../components/player";
import Chat from "../../components/chat";
import Guide from "../../components/guide";
import PopUp from "../../components/popup";

interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

interface gamesProps {
  me: { role: string; voted: boolean };
  state: string;
  subject: string;
  round: number;
  currentDescriber: string;
  subjectDescription: { userId: string; description: string }[];
  votes: string;
}

interface GameProps {
  user: playersProps;
  roomcode: string;
}

function Game({ user, roomcode }: GameProps) {
  const [loading, setLoading] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [nowState, setNowState] = useState("");
  const [game, setGame] = useState<gamesProps>();
  const [voteIndex, setVoteIndex] = useState(-1);
  const [users, setUsers] = useState<playersProps[]>();
  const [result, setResult] = useState("");
  const loadGameInfo = async () => {
    axios
      .get(
        `https://realdragon.herokuapp.com/room?roomCode=${roomcode}&userId=${user.userId}`
      )
      .then(({ data }) => {
        setIsManager(data.room.owner == user.userId);
        setNowState(data.room.state);
        setUsers(data.users);
        if (data.game) setGame(data.game);
        if (data.game.lastGameResult)
          setResult(data.game.lastGameResult.winner);
      })
      .then(() => setLoading(true))
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };
  useEffect(() => {
    const interval = setInterval(loadGameInfo, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <S.Layout>
        <S.Game>
          <S.Roomcode>
            [room] {roomcode}
            <br />
            [round] {game ? game.round : "게임 시작 전입니다."}
          </S.Roomcode>
          <Player
            userId={user.userId}
            roomcode={roomcode}
            isVoting={game?.state === "VOTING"}
            descriptions={game?.subjectDescription || []}
            voteIndex={voteIndex}
            setVoteIndex={setVoteIndex}
          />
          <Guide
            userId={user.userId}
            roomcode={roomcode}
            isManager={isManager}
            now={game?.state || nowState}
            keyword={game?.subject || ""}
            isMafia={game?.me.role === "MAFIA" || false}
            voteIndex={game?.me.voted == true ? -1 : voteIndex}
            setVoteIndex={setVoteIndex}
            users={users || []}
            result={result}
          />
          <Chat />
          {game?.state === "DESCRIBING" &&
          game?.currentDescriber == user.userId ? (
            <PopUp
              roomcode={roomcode}
              userId={user.userId}
              isGuessing={false}
              isMafia={game?.me.role === "MAFIA" || false}
              keyword={game?.subject || ""}
            />
          ) : (
            <></>
          )}
          {game?.state === "GUESSING" && game?.me.role === "MAFIA" ? (
            <PopUp
              roomcode={roomcode}
              userId={user.userId}
              isGuessing={true}
              isMafia={game?.me.role === "MAFIA" || false}
              keyword={game?.subject || ""}
            />
          ) : (
            <></>
          )}
        </S.Game>
      </S.Layout>
    </>
  );
}

export default Game;
