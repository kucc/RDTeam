import React from "react";
import * as S from "./styles";

import Player from "../../components/player";
import Chat from "../../components/chat";
import Guide from "../../components/guide";
import PopUp from "../../components/popup";

function Game() {
  return (
    <>
      <S.Layout>
        <S.Game>
          <Player />
          <Guide />
          <Chat />
          {/* <PopUp /> */}
        </S.Game>
      </S.Layout>
    </>
  );
}

export default Game;
