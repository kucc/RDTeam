import styled from "styled-components/macro";

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
  background: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 4rem;
  font-weight: 800;
`;

interface GuideProps {
  isMapia?: boolean;
}

export const RoleText = styled.span<GuideProps>`
  font-size: 4rem;
  font-weight: 800;
  color: ${(props) => (props.isMapia ? "#900" : "#009")};
`;

export const Comment = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem;
`;
