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

interface GameProps {
  user: playersProps;
  roomcode: string;
}

function Game({ user, roomcode }: GameProps) {
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState(0);
  const [currentDescriber, setCurrentDescriber] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [nowState, setNowState] = useState("");
  const loadGameInfo = async () => {
    axios
      .get(
        `https://realdragon.herokuapp.com/room?roomCode=${roomcode}&userId=${user.userId}`
      )
      .then(({ data }) => {
        //setCurrentDescriber(data.game.currentDescriber);
        setIsManager(data.room.owner == user.userId);
        console.log(data.room.owner);
        console.log(user.userId);
        setNowState(data.room.state);
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
            room no.
            {roomcode}
            <br />
            round.
            {round}
          </S.Roomcode>
          <Player userId={user.userId} roomcode={roomcode} />
          <Guide
            userId={user.userId}
            roomcode={roomcode}
            isManager={isManager}
            now={nowState}
          />
          <Chat />
          {currentDescriber == user.userId ? <PopUp /> : <></>}
        </S.Game>
      </S.Layout>
    </>
  );
}

export default Game;
