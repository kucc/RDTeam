import styled from "styled-components/macro";

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
`;

export const PopUp = styled.div`
  position: relative;
  width: 70rem;
  height: 30rem;
  background: #ccc;
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
  color: #009;
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
  border-radius: 2rem;
  padding: 1rem;
  margin-top: 3rem;
  :focus-within {
    box-shadow: 0px 0px 5px #00000080;
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
  background: none;
`;

export const SendButton = styled.button`
  width: 7rem;
  outline: none;
  border: none;
  background: #777;
  font-weight: 800;
  border-radius: 1.5rem;
`;
