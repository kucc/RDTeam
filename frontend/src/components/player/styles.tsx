import styled, { css } from "styled-components/macro";
import { COLOR } from "../../constant";

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
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem 0 0 0;
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

interface PlayerCharacterProps {
  index?: number;
  isDead?: boolean;
  isSelected?: boolean;
}

export const PlayerCharacterContainer = styled.div<PlayerCharacterProps>`
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => (props.isSelected ? COLOR.light : "none")};
  border: ${(props) =>
    props.isSelected ? css`1px solid ${COLOR.dark}` : "none"};
  border-radius: 2rem;
`;

export const PlayerCharacter = styled.img<PlayerCharacterProps>`
  width: 100%;
  padding: 3rem;
  filter: saturate(${(props) => (props.isDead ? "0%" : "100%")});
  opacity: ${(props) => (props.isDead ? "70%" : "100%")};
`;

export const CharacterBlank = styled.img<PlayerCharacterProps>`
  width: 80%;
  padding: 3rem;
  opacity: 0.7;
`;

export const PlayerName = styled.div<PlayerCharacterProps>`
  margin-bottom: -3rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => (props.isDead ? "#aaa" : "#000")};
  text-decoration: ${(props) => (props.isDead ? "line-through" : "none")};
`;

export const Bubble = styled.div`
  background: ${COLOR.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: -3rem;
  width: 100%;
  height: 6rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 2rem;
  font-size: 1.6rem;
`;
