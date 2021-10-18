import styled from "styled-components";
import { Container, ContainerFlexColumn, colors } from "../../styles/styles";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface Props {}

export default function AdminPage(props: Props) {
  return (
    <ContainerFlexColumn>
      <Link to={routes.createPlace} style={{ textDecoration: "none" }}>
        <SubContainer>모임 생성</SubContainer>
      </Link>
      <Link to={routes.editPlace} style={{ textDecoration: "none" }}>
        <SubContainer>모임 변경</SubContainer>
      </Link>
      <Link to={routes.admin} style={{ textDecoration: "none" }}>
        <SubContainer>모임 참가자보기</SubContainer>
      </Link>
    </ContainerFlexColumn>
  );
}

export const LinkWithoutUnderLine = styled.a`
  text-decoration: none;
`;

const SubContainer = styled(Container)`
  color: ${colors.Black};
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  margin-top: 21px;
  cursor: pointer;
`;
