import styled from "styled-components/macro";
import { COLOR } from "../../constant";

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.background};
`;

export const Game = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Roomcode = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.8rem;
  font-weight: 800;
`;
