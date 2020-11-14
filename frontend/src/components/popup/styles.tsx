import styled, { css } from "styled-components/macro";
import { COLOR } from "../../constant";

export const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #00000088;
  border-radius: 2rem;
`;

export const PopUp = styled.div`
  position: relative;
  width: 70rem;
  height: 30rem;
  background: #d9ddeeaa;
  border-radius: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem;
`;

export const Text = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
`;

interface PopUpProps {
  isMapia?: boolean;
}

export const KeyWord = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLOR.blue};
`;

export const Comment = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #fff;
  opacity: 0.6;
  border-radius: 2rem;
  padding: 1rem;
  margin-top: 3rem;
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
