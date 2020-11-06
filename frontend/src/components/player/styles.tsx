import styled from "styled-components/macro";

export const Layout = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Player = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerCharacterWrapper = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const PlayerCharacterContainer = styled.div`
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface PlayerCharacterProps {
  index: number;
  isDead: boolean;
}

export const PlayerCharacter = styled.img<PlayerCharacterProps>`
  width: 100%;
  padding: 3rem;
  filter: saturate(${(props) => (props.isDead ? "0%" : "100%")});
  opacity: ${(props) => (props.isDead ? "70%" : "100%")};
`;

export const PlayerName = styled.div`
  margin-bottom: -3rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Bubble = styled.div`
  background: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: -3rem;
  height: 6rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 2rem;
  font-size: 1.6rem;
`;
