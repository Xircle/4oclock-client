import { PureComponent } from "react";
import styled from "styled-components";
import { colors } from "../../styles/styles";

interface Props {}

export default class Footer extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <RightText>Copyright © 연고링 All Rights Reserved</RightText>
        <ContentText>
          사업자등록번호 682-81-03147 | 대표: 양희원 <br />
          서울특별시 마포구 백범로31길 21, 지상2층 G215호 (공덕동, 서울창업허브,
          서울복지타운)| 고객문의: 010-8033-6028
        </ContentText>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px;
  background-color: ${colors.BareGray};
`;

const RightText = styled.div`
  font-weight: bold;
  font-size: 13px;
`;

const ContentText = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${colors.MidGray};
`;
