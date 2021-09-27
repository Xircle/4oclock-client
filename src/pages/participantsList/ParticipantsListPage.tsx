import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import {
  Container,
  ProcedureHeading,
  SubText,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
} from "../../styles/styles";
import ParticipantsListContainer from "../../components/participantsList/ParticipantsListContainer";
import { AgeNumberToString } from "../../lib/utils";

interface Props {}

export default function participantsListPage(props: Props) {
  return (
    <Container>
      <PageTitle title="참가자 리스트" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>
            장소 이름 모임을 <br /> 신청한 친구들
          </Heading>
          <SubTextParticipantsList>
            현재 모임을 신청한 친구들의 소개 정보예요 {":)"} <br />
            <b>친구의 전체 프로필 정보</b>는 모임 참가신청 완료를 하시면
            가능해요{"."}
          </SubTextParticipantsList>
          <InfoDiv>
            <InfoText>남 X</InfoText>
            <InfoText style={{ marginLeft: "15px" }}>여 X</InfoText>
            <InfoText style={{ marginLeft: "15px" }}>
              평균 나이 {AgeNumberToString(22)}
            </InfoText>
          </InfoDiv>
          <ParticipantsListRowWrapper>
            <ParticipantsListContainer
              hasError={false}
              isLoading={false}
              ParticipantsListData={[]}
            />
          </ParticipantsListRowWrapper>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 30px;
  line-height: 35px;
`;

const SubTextParticipantsList = styled(SubText)`
  margin-top: 19px;
  width: 315px;
  line-height: 20px;
  font-weight: 500;
  font-size: 11px;
  b {
    font-weight: 900;
  }
`;

const InfoText = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.MidGray};
`;

const InfoDiv = styled.div`
  margin-top: 30px;
`;

const ParticipantsListRowWrapper = styled.div`
  margin-top: 30px;
`;
