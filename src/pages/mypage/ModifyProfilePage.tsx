import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
  FlexDiv,
  Avartar,
  colors,
} from "../../styles";
import { DummyAvartar } from "../../dummyResources/dummyData";

interface Props {}

export default function ModifyProfilePage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>프로필 수정하기</Heading>
        <FlexDiv>
          <AvartarProfile src={DummyAvartar} />
        </FlexDiv>
        <FlexDiv
          style={{
            marginTop: "11px",
            fontSize: "13px",
            fontWeight: 700,
            color: colors.MidBlue,
          }}
        >
          <p>프로필사진 수정하러가기</p>
        </FlexDiv>
        <WarningText>
          학교와 나이, 관심사 변경은 불가능해요. 수정을 원하실 경우{" "}
          <b>마이페이지 {">"} 문의하기</b>에서 상담원에게 문의해주세요!
        </WarningText>
      </ContainerwithLeftRightMargin>
      <BottomFixedButtonContainer>
        <BottomFixedButtoninContainer>수정하기</BottomFixedButtoninContainer>
      </BottomFixedButtonContainer>
    </ContainerFlexColumn>
  );
}

const WarningText = styled.p`
  margin-top: 18px;
  font-weight: normal;
  font-size: 10px;
  color: ${colors.MidGray};
  b {
    font-weight: 900;
  }
`;

const AvartarProfile = styled(Avartar)`
  width: 125px;
  height: 125px;
  margin-top: 45px;
`;
