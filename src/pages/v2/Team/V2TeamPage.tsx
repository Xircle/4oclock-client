import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamById } from "../../../lib/api/getTeamById";
import { TeamData } from "../../../lib/api/types";
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
  const { data: teamData } = useQuery<TeamData | undefined>(
    ["team", teamId],
    () => getTeamById(teamId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
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
            {teamData?.leader?.shortBio
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
          {teamData?.meetingDay && (
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
          )}
          {teamData?.maxParticipant && (
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
          )}
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹클럽 소개</DetailInfoTitle>
          <TeamDescription>{teamData?.description}</TeamDescription>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹모임 일정 및 활동</DetailInfoTitle>
          <TeamSchedule>
            1회차:우정팅 진행
            <br />
            2회차:6인 팀매칭 활동
            <br />
            3회차:6인 팀매칭 활동
            <br />
            4화차: 스터디 번개
          </TeamSchedule>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹주 활동 지역</DetailInfoTitle>
          <TeamDescription>{teamData?.areaInfo}</TeamDescription>
        </DetailInfoSection>
        <DetailInfoSection>
          <DetailInfoTitle>🔹신청 전, 꼭 알아주세요!</DetailInfoTitle>
          <DetailInfoTag>
            1.승인이 된 후에 꼭 오카방에 입장해주세요💙
            <br />
            2.꼭 모임을 신청할때 날짜 , 테마를 잘 확인해주세요
            <br />
            3.신청서를 꼼꼼히 작성해줘야 리더가 승인을 해줘요!
            <br />
            4.모임 3회 미만 참석 시 클럽 영구제명입니다
          </DetailInfoTag>
        </DetailInfoSection>
      </DetailInfoContainer>
    </Container>
  );
}

const InfoSection = styled.div``;

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

const Container = styled.div``;

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
