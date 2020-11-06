import styled, { css, keyframes } from "styled-components/macro";
import { COLOR } from "../../constant";

export const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.background};
  overflow-x: hidden;
  padding-top: 7rem;
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
  background: ${COLOR.light};
  border-radius: 2rem;
  padding: 1rem;
  margin: 1rem;
  :focus-within {
    box-shadow: 0px 0px 5px ${COLOR.darker};
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
  background: ${COLOR.dark};
  font-weight: 800;
  border-radius: 2rem;
  font-size: 2rem;
  :hover {
    background: ${COLOR.darker};
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

/* */

const wave = keyframes`
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1773px;
  }
`;

const swell = keyframes`
  0%, 100% {
    transform: translate3d(0, 30px,0);
  }
  50% {
    transform: translate3d(0,5px,0);
  }
`;

export const WaveContainer = styled.div`
  position: absolute;
  top: -4rem;
  width: 100%;
  height: 5rem;
`;

interface WaveProps {
  url: string;
}

export const Wave = styled.div<WaveProps>`
  position: absolute;
  left: 0;
  width: 7092px;
  height: 212px;
  transform: translate3d(0, 0, 0);
  background-image: url(${(props) => props.url});
  animation: ${wave} 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite,
    ${swell} 5s ease -1.25s infinite;
  opacity: 0.8;
  transform: translate3d(0, 0, 0);
`;
