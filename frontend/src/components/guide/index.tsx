import React from "react";
import * as S from "./styles";

function Guide() {
  const isMapia = false;
  const keyword = "인생";
  return (
    <>
      <S.Layout>
        <S.Guide>
          <S.Text>
            당신은{" "}
            <S.RoleText isMapia={isMapia}>
              {isMapia ? "마피아" : "시민"}
            </S.RoleText>
            입니다.
          </S.Text>
          <S.Comment>
            {isMapia
              ? "눈치껏 제시어를 알아맞혀보세용"
              : `제시어는 ${keyword}입니다.`}
          </S.Comment>
        </S.Guide>
      </S.Layout>
    </>
  );
}

export default Guide;
