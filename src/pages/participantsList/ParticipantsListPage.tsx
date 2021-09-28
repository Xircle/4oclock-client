import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import {
  Container,
  ProcedureHeading,
  SubText,
  ContainerwithLeftRightMargin,
  colors,
  BottomFixedButtonContainer,
  SpaceForNavBar,
  BottomFixedButtoninContainer,
} from "../../styles/styles";
import ParticipantsListContainer from "../../components/participantsList/ParticipantsListContainer";
import {
  AgeNumberToString,
  decodeUrlSlug,
  encodeUrlSlug,
} from "../../lib/utils";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PlaceData, PlaceParticipantListData } from "../../lib/api/types";
import { useQuery } from "react-query";
import { getPlaceParticipantList } from "../../lib/api/getParticipantList";
import { getPlaceById } from "../../lib/api/getPlaceById";

interface MatchParmas {
  name: string;
}

interface Props
  extends RouteComponentProps<
    MatchParmas,
    {},
    {
      placeId: string;
      startDateFromNow: string;
      detailAddress: string;
      recommendation: string;
      participationFee: number;
    }
  > {}

export default function ParticipantsListPage({
  history,
  match,
  location,
}: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // 캐시된 placeData 정보 가져오기
  const { placeId } = location.state;
  const { data: placeData } = useQuery<PlaceData | undefined>(
    ["place-detail", placeId],
    () => getPlaceById(placeId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: participantListData,
    isLoading,
    isError,
  } = useQuery<PlaceParticipantListData | undefined>(
    ["participants-list", placeId],
    () => getPlaceParticipantList(placeId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      <PageTitle title="참가자 리스트" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>
            {placeData && decodeUrlSlug(placeData.name)} 모임을 <br /> 신청한
            친구들
          </Heading>
          <SubTextParticipantsList>
            현재 모임을 신청한 친구들의 소개 정보예요 {":)"} <br />
            <b>친구의 전체 프로필 정보</b>는 모임 참가신청 완료를 하시면
            가능해요{"."}
          </SubTextParticipantsList>
          <InfoDiv>
            <InfoText>
              남 {participantListData?.participantsInfo.male_count}
            </InfoText>
            <InfoText style={{ marginLeft: "15px" }}>
              여{" "}
              {participantListData &&
                participantListData?.participantsInfo?.total_count -
                  participantListData?.participantsInfo?.male_count}
            </InfoText>
            <InfoText style={{ marginLeft: "15px" }}>
              평균 나이{" "}
              {participantListData &&
                AgeNumberToString(
                  participantListData?.participantsInfo?.average_age
                )}
            </InfoText>
          </InfoDiv>
          <ParticipantsListRowWrapper>
            <ParticipantsListContainer
              hasError={isError}
              isLoading={isLoading}
              ParticipantsListData={
                participantListData?.participantListProfiles
              }
            />
          </ParticipantsListRowWrapper>
        </ContainerwithLeftRightMargin>
        <SpaceForNavBar></SpaceForNavBar>
      </BackButtonLayout>
      <BottomFixedButtonContainer>
        <BottomFixedButtoninContainer
          onClick={() => {
            placeData &&
              !placeData.isParticipating &&
              history.push(`/reservation/${encodeUrlSlug(placeData.name)}`, {
                placeId,
                startDateFromNow: placeData.startDateFromNow,
                detailAddress: placeData.placeDetail.detailAddress,
                recommendation: placeData.recommendation,
                participationFee: placeData.placeDetail.participationFee,
              });
          }}
        >
          참여하기
        </BottomFixedButtoninContainer>
      </BottomFixedButtonContainer>
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
