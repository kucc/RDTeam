import styled from "styled-components/macro";

export const Layout = styled.div`
  width: 30%;
  height: 100%;
`;

export const Chat = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
`;

export const SendButton = styled.button`
  width: 7rem;
  outline: none;
  border: none;
  background: #777;
  font-weight: 800;
`;
