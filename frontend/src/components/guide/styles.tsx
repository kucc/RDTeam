import styled from "styled-components/macro";
import { COLOR } from "../../constant";

export const Layout = styled.div`
  width: 70%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Guide = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLOR.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 2rem;
`;

export const Text = styled.div`
  font-size: 4rem;
  font-weight: 700;
`;

interface GuideProps {
  isMapia?: boolean;
}

export const RoleText = styled.span<GuideProps>`
  font-size: 4rem;
  font-weight: 800;
  color: ${(props) => (props.isMapia ? COLOR.red : COLOR.blue)};
`;

export const Comment = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem;
`;

export const GameStartButton = styled.button`
  width: 20rem;
  height: 5rem;
  outline: none;
  border: none;
  background: ${COLOR.dark};
  font-weight: 800;
  border-radius: 3rem;
  font-size: 2rem;
  :hover {
    background: ${COLOR.darker};
  }
`;
