import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import ImageCarousel from "../../../components/UI/ImageCarousel";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamById } from "../../../lib/api/getTeamById";
import { GetTeamByIdData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { DayNumToKor } from "../../../lib/v2/utils";
import { colors, V2OrangeButton } from "../../../styles/styles";
interface MatchParms {
  teamId: string;
}
interface LocationState {}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {}

export default function V2TeamPage({ match, location, history }: Props) {
  const { teamId } = match.params;
  const { data: teamData } = useQuery<GetTeamByIdData | undefined>(
    ["team", teamId],
    () => getTeamById(teamId),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (teamData) console.log(teamData);
  }, [teamData]);

  const applyHandler = () => {
    history.push(`/v2/apply/${teamId}`, {
      clubName: teamData?.name,
      meetingHour: teamData?.meetingHour,
      meetingDay: teamData?.meetingDay,
      price: teamData?.price,
      maxParticipant: teamData?.maxParticipant,
    });
  };

  const goToLeaderInfoPage = () => {
    if (teamData?.leader?.id)
      history.push(`/v/leader_info_page/${teamData?.leader?.id}`);
  };

  return (
    <Container>
      <V2SubHeaderC title="정모 활동 정보" />
      <MainPicContainer>
        <MainPic
          src={optimizeImage(teamData?.images?.[0], {
            width: 375,
            height: 230,
          })}
          alt={teamData && teamData?.name + "사진"}
        />
      </MainPicContainer>
      <SectionWithPadding>
        <TeamName>{teamData?.name}</TeamName>
        <LeaderSection>
          <LeaderAvatar onClick={goToLeaderInfoPage}>
            <LeaderImg
              src={optimizeImage(teamData?.leader?.profileImageUrl, {
                width: 50,
                height: 50,
              })}
            />
            <LeaderNameText>
              {teamData?.leader?.username} leader {">"}
            </LeaderNameText>
          </LeaderAvatar>
          <SubTextDiv>🙋‍♀️리더 자기 소개</SubTextDiv>
          <LeaderIntro>
            {teamData?.leaderIntro
              ? teamData?.leaderIntro
              : teamData?.leader?.shortBio
              ? teamData?.leader?.shortBio
              : "반가워요"}
          </LeaderIntro>
        </LeaderSection>
        <SOrangeButton onClick={applyHandler}>
          신청서 작성하러 가기
        </SOrangeButton>
      </SectionWithPadding>
      <Dividor>✨클럽 지원 정보✨</Dividor>
      <DetailInfoContainer>
        <DetailInfoSection>
          <DetailInfoTitle>🔹클럽 정보</DetailInfoTitle>

          <Row style={{ marginBottom: 22 }}>
            <FontAwesomeIcon icon={faWonSign} size="1x" />
            <ClubInfoHeading>활동비 {teamData?.price}원</ClubInfoHeading>
          </Row>
          {teamData?.meetingDay ? (
            <>
              <Row>
                <FontAwesomeIcon icon={faClock} size="lg" />
                <ClubInfoHeading>
                  매주 {DayNumToKor(teamData?.meetingDay.toString())}요일{" "}
                  {teamData?.meetingHour}시
                </ClubInfoHeading>
              </Row>
              <ClubInfoSubText>약속시간을 잘 지켜줘!</ClubInfoSubText>
            </>
          ) : (
            <></>
          )}
          {teamData?.maxParticipant ? (
            <>
              <Row style={{ marginTop: 22 }}>
                <FontAwesomeIcon icon={faUser} size="lg" />
                <ClubInfoHeading>
                  프렌즈 최대 {teamData?.maxParticipant}명 (리더 포함)
                </ClubInfoHeading>
              </Row>
              <ClubInfoSubText>
                *첫모임 7일전까지 최소인원이 충족되지 않으면 모집기간 연장을
                위해 전체 모임일정을 연기할 수 있습니다
              </ClubInfoSubText>
            </>
          ) : (
            <></>
          )}
          <Row style={{ marginTop: 22 }}>
            <FontAwesomeIcon icon={faUser} size="lg" />
            <ClubInfoHeading>
              나이대: 남자 {teamData?.maleMinAge}~{teamData?.maleMaxAge} / 여자{" "}
              {teamData?.femaleMinAge}~{teamData?.femaleMaxAge}
            </ClubInfoHeading>
          </Row>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹클럽 소개</DetailInfoTitle>
          <DetailInfoTitle>{teamData?.oneLineInfo}</DetailInfoTitle>
          <TeamDescription>{teamData?.description}</TeamDescription>
        </DetailInfoSection>
        <DetailInfoSection>
          <ImageCarousel imageUrls={teamData?.images} />
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹자세한 모임 일정 및 활동</DetailInfoTitle>
          <TeamSchedule>
            {teamData?.activity_titles?.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <ActivityTitle>
                    {teamData?.activity_titles?.[idx]}
                  </ActivityTitle>
                  <ActivityDetail>
                    {teamData?.activity_details?.[idx]}
                  </ActivityDetail>
                </Fragment>
              );
            })}
          </TeamSchedule>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹주 활동 지역</DetailInfoTitle>
          <TeamDescription>
            {teamData?.area_names && teamData?.area_names?.length > 0
              ? teamData?.area_names?.join(", ")
              : teamData?.areaInfo ?? "상관없음"}
          </TeamDescription>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>해당 클럽의 MISSION RULE</DetailInfoTitle>
          <TeamDescription>{teamData?.mission}</TeamDescription>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹신청 전, 꼭 알아주세요!</DetailInfoTitle>
          <DetailInfoTag>
            1.신청 후에 리더의 승인을 기다려주세요!💙
            <br />
            2.꼭 모임을 신청할때 날짜 , 테마를 잘 확인해주세요
            <br />
            3.그 중 가장 빠른 리더의 승인이 된 모임에 들어가요 ! club 단톡이
            형성이 돼요{":)"}
            <br />
            마음에 드는 모임에 신청하기 !<br />
            4.모임 3회 미만 참석 시 클럽 영구제명입니다
          </DetailInfoTag>
        </DetailInfoSection>
      </DetailInfoContainer>
      <ParticipateWrapper>
        {teamData?.maxParticipant ? (
          <ParticipateCount>
            잔여석 남
            {teamData?.maleCount
              ? teamData.maxParticipant / 2 - teamData?.maleCount > 0
                ? Math.ceil(teamData.maxParticipant / 2 - teamData?.maleCount)
                : 0
              : Math.ceil(teamData.maxParticipant / 2)}{" "}
            여
            {teamData?.femaleCount
              ? teamData.maxParticipant / 2 - teamData?.femaleCount > 0
                ? Math.ceil(teamData.maxParticipant / 2 - teamData?.femaleCount)
                : 0
              : Math.ceil(teamData.maxParticipant / 2)}{" "}
            남음
          </ParticipateCount>
        ) : (
          <></>
        )}
        <ParticipateButton onClick={applyHandler}>
          정기클럽 신청하기 {">>"}
        </ParticipateButton>
      </ParticipateWrapper>
    </Container>
  );
}

const ActivityTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #505050;
`;

const ActivityDetail = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #8c94a4;
  margin-top: 11px;
  margin-bottom: 33px;
`;

const ParticipateCount = styled.span`
  position: absolute;
  right: 25px;
  top: -20px;
  background: #ff3333;
  border-radius: 20px;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  padding: 9px 14px;
  margin-left: 10px;
  /* identical to box height */

  color: #ffffff;
`;

const Dividor = styled.div`
  font-weight: 700;
  size: 22px;
  color: ${colors.Black};
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.Lime};
  margin-top: 30px;
`;

const SOrangeButton = styled(V2OrangeButton)`
  margin-top: 40px;
`;

const SubTextDiv = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
`;

const LeaderIntro = styled.div`
  margin: 5px;
  padding: 10px 18px;
  background-color: #feffc2;
  min-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  line-height: 22px;
  color: #50555c;
`;

const LeaderAvatar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LeaderNameText = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #8c94a4;
  margin-left: 10px;
`;

const LeaderSection = styled.div`
  margin-top: 18px;
`;
const LeaderImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
  display: inline-block;
  border: 3px solid #e67255;
`;

const TeamName = styled.div`
  font-weight: 700;
  font-size: 30px;
`;

const SectionWithPadding = styled.div`
  padding: 21px;
`;

const Container = styled.div`
  position: relative;
`;

const MainPicContainer = styled.div`
  height: 160px;
  position: relative;
`;

const MainPic = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const DetailInfoContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 200px;
`;

const DetailInfoSection = styled.div`
  margin-top: 30px;
`;

const DetailInfoTitle = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 12px;
`;

const DetailInfoTag = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 200%;
  /* or 200% */

  color: #505050;
`;

const TeamDescription = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  color: #8c94a4;
`;

const TeamSchedule = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 26px;
  /* or 200% */

  color: #505050;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  color: #505050;
`;

const ClubInfoHeading = styled.div`
  color: #fd8a66;
  margin-left: 10px;
`;

const ClubInfoSubText = styled.div`
  font-weight: 500;
  font-size: 11px;
  line-height: 19px;
  /* or 173% */

  color: #8c94a4;
  margin-top: 12px;
`;

const ParticipateButton = styled.div`
  width: 100%;
  height: 80px;
  background: rgba(33, 225, 156);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #050505;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  cursor: pointer;
`;

const ParticipateWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 375px;
`;
