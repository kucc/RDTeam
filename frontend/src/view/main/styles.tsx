import styled from "styled-components/macro";

export const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #aaa;
`;

export const Title = styled.div`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 3rem;
`;

export const InputContainer = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ccc;
  border-radius: 2rem;
  padding: 1rem;
  margin: 1rem;
  :focus-within {
    box-shadow: 0px 0px 5px #00000050;
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
  background: none;
  font-size: 2rem;
`;

export const Label = styled.div`
  width: 10rem;
  font-size: 2rem;
  font-weight: 800;
  padding: 1rem;
`;

export const ButtonContainer = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
`;

export const RoomButton = styled.button`
  width: 19rem;
  height: 6rem;
  outline: none;
  border: none;
  background: #777;
  font-weight: 800;
  border-radius: 1.5rem;
  font-size: 2rem;
  :hover {
    background: #555;
  }
`;

export const Credit = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 150%;
  margin-top: 5rem;
`;

export const Comment = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;
