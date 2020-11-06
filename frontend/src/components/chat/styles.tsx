import styled, { css } from "styled-components/macro";
import { COLOR } from "../../constant";

export const Layout = styled.div`
  width: 30%;
  height: 100%;
`;

export const Chat = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${COLOR.darker};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: left;
  padding: 1rem;
  border-radius: 0 2rem 2rem 0;
`;

export const ChatLog = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
`;

export const NickName = styled.span`
  color: red;
  font-weight: 700;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 2rem 2rem 2rem 0;
  padding: 1rem;
  margin-top: 1rem;
  :focus-within {
    box-shadow: 0px 0px 5px ${COLOR.dark};
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
  background: none;
`;

interface ButtonProps {
  isBlank?: boolean;
}

export const SendButton = styled.button<ButtonProps>`
  width: 7rem;
  outline: none;
  border: none;
  background: ${(props) => (props.isBlank ? COLOR.gray : COLOR.dark)};
  color: ${(props) => (props.isBlank ? COLOR.darkgray : "black")};
  font-weight: 800;
  border-radius: 1.5rem;
`;
