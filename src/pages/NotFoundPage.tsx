import { useHistory } from "react-router-dom";
import routes from "../routes";
import { Heading, MainBtn, SubText } from "../styles/styles";
import styled from "styled-components";

export default function NotFoundPage() {
  const history = useHistory();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading style={{ fontSize: "96px", fontWeight: "normal" }}>404</Heading>
      <SubText
        style={{ fontSize: "18px", lineHeight: "22px", fontWeight: "bold" }}
      >
        찾을 수 없는 페이지입니다
      </SubText>
      <SubText style={{ fontSize: "14px", fontWeight: "normal" }}>
        잠시후에 다시 시도해주세요
      </SubText>
      <HomeBtn onClick={() => history.push(routes.placeFeed)}>홈으로</HomeBtn>
    </div>
  );
}
const HomeBtn = styled(MainBtn)`
  width: auto;
  height: auto;
  padding: 0px 1.125rem;
  height: 2.5rem;
  margin-top: 16px;
`;
