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
  isMafia?: boolean;
}

export const RoleText = styled.span<GuideProps>`
  font-size: 4rem;
  font-weight: 800;
  color: ${(props) => (props.isMafia ? COLOR.red : COLOR.blue)};
`;

export const Comment = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem;
`;

interface ButtonProps {
  isBlank?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 20rem;
  height: 5rem;
  outline: none;
  border: none;
  background: ${(props) => (props.isBlank ? COLOR.gray : COLOR.dark)};
  color: ${(props) => (props.isBlank ? COLOR.darkgray : "black")};
  font-weight: 800;
  border-radius: 3rem;
  font-size: 2rem;
  margin-top: 1rem;
  :hover {
    background: ${(props) => (props.isBlank ? COLOR.gray : COLOR.darker)};
  }
`;
