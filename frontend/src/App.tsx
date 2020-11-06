import React, { useState } from "react";
import Game from "./view/game";
import Main from "./view/main";

export interface playersProps {
  nickname: string;
  userId: string;
  state: string;
}

function App() {
  const [page, setPage] = useState("main");
  const [user, setUser] = useState<playersProps>({
    nickname: "",
    userId: "",
    state: "",
  });
  const [roomcode, setRoomcode] = useState("");
  return (
    <>
      {page == "main" ? (
        <Main
          user={user}
          setUser={setUser}
          roomcode={roomcode}
          setRoomcode={setRoomcode}
          startGame={() => setPage("play")}
        />
      ) : (
        <Game user={user} roomcode={roomcode} />
      )}
    </>
  );
}

export default App;
