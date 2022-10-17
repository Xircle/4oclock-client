import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { seeUserById } from "../../../lib/api/seeUserById";
import { UserProfile } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";

interface MatchParms {
  leaderId: string;
}
interface LocationState {}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {}

export default function V2LeaderInfoPage({ match }: Props) {
  const { leaderId } = match.params;
  const { data: leaderData, isLoading } = useQuery<UserProfile | undefined>(
    ["User", leaderId],
    () => seeUserById(leaderId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Container>
      <V2SubHeaderC title="리더 정보" />
      <ProfileWrapper>
        <ProfileContainer>
          <ProfileLeftContainer>
            <ProfileImg
              src={optimizeImage(leaderData?.profileImageUrl, {
                width: 60,
                height: 60,
              })}
            />
          </ProfileLeftContainer>
          <ProfileRightContainer>
            <Row>
              <NameTag>{leaderData?.username}</NameTag>
              <MBTITag>{leaderData?.MBTI}</MBTITag>
            </Row>
            <JobTag>{leaderData?.job}</JobTag>
            <UnivTag>
              {leaderData?.university} / {leaderData?.age}살 /{" "}
              {leaderData?.gender == "Male" ? "남" : "여"}
            </UnivTag>
          </ProfileRightContainer>
        </ProfileContainer>
      </ProfileWrapper>
      <IntroductionContainer>
        <IntroductionHeading>자기소개</IntroductionHeading>
        <IntroductionText>{leaderData?.shortBio}</IntroductionText>
      </IntroductionContainer>
    </Container>
  );
}

const IntroductionContainer = styled.div``;

const IntroductionHeading = styled.div`
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  color: #12121d;
`;

const ProfileWrapper = styled.div`
  padding-bottom: 35px;
  margin-top: 30px;
  border-bottom: 0.5px solid #dadada;
`;

const UnivTag = styled.div`
  color: #6f7789;
  font-weight: 400;
  font-size: 13px;
`;

const JobTag = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #8c94a4;
`;

const Row = styled.div`
  display: flex;
`;

const NameTag = styled.div`
  color: #222222;
  font-weight: 700;
  font-size: 16px;
  margin-right: 7px;
`;

const MBTITag = styled.div`
  color: #e67255;
  font-weight: 700;
  font-size: 16px;
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Container = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileLeftContainer = styled.div``;

const ProfileRightContainer = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const IntroductionText = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #505050;
`;
