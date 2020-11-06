import React from "react";
import * as S from "./styles";

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
  return (
    <>
      <S.Layout>
        <S.Game>
          <Player />
          <Guide />
          <Chat />
          {/* {<PopUp />} */}
        </S.Game>
      </S.Layout>
    </>
  );
}

export default Game;
