import styled from "styled-components";
import {
  Avartar,
  SubText,
  colors,
  InterestTag,
  ContainerwithLeftRightMargin,
  FlexDiv,
  MainBtn,
  SpaceForNavBar,
  Container,
} from "../../styles/styles";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../../lib/api/types";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderWrapper } from "../../components/shared/Loader";
import routes from "../../routes";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import { seeUserById } from "../../lib/api/seeUserById";
import { RouteComponentProps, useLocation } from "react-router-dom";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import PageTitle from "../../components/PageTitle";
import queryString from "query-string";
import optimizeImage from "../../lib/optimizeImage";

interface LocationState {
  id: string;
  profileImageUrl?: string;
  username?: string;
}

interface Props extends RouteComponentProps {}

export default function ParticipantProfilePage({ history }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation<LocationState>();
  const UrlSearch = location.search;
  const cameFromChat = Boolean(
    queryString.parse(UrlSearch).cameFromChat === "true"
  );

  const { data: userProfileData, isLoading } = useQuery<
    UserProfile | undefined
  >(["User", location.state.id], () => seeUserById(location.state.id), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      alert("친구 프로필은 로그인을 하셔야 볼 수 있어요!");
      window.location.href = routes.root;
    }
  }, []);

  return (
    <SContainer>
      <PageTitle title="참여자 프로필" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading style={{ marginTop: "20px" }}>
            <IndicatorBox>재밌고 따뜻한 우리의 대학가, 연고이팅</IndicatorBox>
          </Heading>
          <FlexDiv>
            <AvartarBig
              src={optimizeImage(
                location.state?.profileImageUrl ||
                  userProfileData?.profileImageUrl ||
                  "/avatar/anonymous_user.png",
                { width: 174, height: 174 }
              )}
              alt="friend-profile"
              onClick={() => {
                if (!userProfileData?.profileImageUrl) return;
                history.push("image/0", {
                  payload: {
                    id: userProfileData?.profileImageUrl,
                    imageUrls: [userProfileData?.profileImageUrl],
                  },
                });
              }}
            />
          </FlexDiv>

          <FlexDiv style={{ marginTop: "15px" }}>
            <Name>
              {location.state?.username ||
                userProfileData?.username ||
                "써클 개발자"}
            </Name>
          </FlexDiv>

          <FlexDiv>
            <TagOnName>
              <p>{userProfileData?.job || "18학번 헌내기"}</p>
            </TagOnName>
          </FlexDiv>

          <InnerContainer style={{ marginTop: "25px" }}>
            <BlackSubText>{userProfileData?.MBTI}</BlackSubText>
            <BlackSubText style={{ marginLeft: "20px" }}>
              {userProfileData?.personality}
            </BlackSubText>
          </InnerContainer>
          <InnerContainer style={{ marginTop: "20px" }}>
            <InnerContent
              style={{
                marginLeft: "0px",
                fontWeight: 300,
                fontSize: "14px",
                color: "background: #505050",
              }}
            >
              {userProfileData?.shortBio || `안녕하세요!`}
            </InnerContent>
          </InnerContainer>
          <InnerContainer style={{ marginTop: "10px" }}>
            <InnerContent>
              {" "}
              <GraySubText>
                {userProfileData?.location
                  ? userProfileData?.location
                  : "대한민국 어딘가"}{" "}
                / {userProfileData?.university || "딱대학교"} /{" "}
                {userProfileData?.age + "세" || "역마살"} /{" "}
                {userProfileData
                  ? userProfileData.gender === "Male"
                    ? "남"
                    : "여"
                  : "모름"}
              </GraySubText>
            </InnerContent>
          </InnerContainer>
        </ContainerwithLeftRightMargin>
        <div style={{ width: "100%", height: "50px" }}></div>
        {storage.getItem(CURRENT_USER).uid !== userProfileData?.id &&
          !cameFromChat && (
            <BottomButtonsContainer>
              <ChatButton
                onClick={() => {
                  history.push(`/chatRoom/0`, {
                    id: location.state?.id || userProfileData?.id,
                    profileImageUrl:
                      location.state?.profileImageUrl ||
                      userProfileData?.profileImageUrl,
                    username:
                      location.state?.username || userProfileData?.username,
                  });
                }}
              >
                채팅하기
              </ChatButton>
            </BottomButtonsContainer>
          )}
      </BackButtonLayout>

      {isLoading && (
        <>
          <LoaderWrapper>
            <ClipLoader
              loading={isLoading}
              color={colors.MidBlue}
              css={{ name: "width", styles: "border-width: 4px;" }}
              size={30}
            />
          </LoaderWrapper>
        </>
      )}
    </SContainer>
  );
}

const SContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const BottomButtonsContainer = styled.div`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
`;

const ChatButton = styled(MainBtn)`
  width: 352px;
  height: 45px;
  filter: none;
  box-shadow: none;
  cursor: pointer;
  background-color: ${colors.MidBlue};
  color: #fff;
`;

const GraySubText = styled(SubText)`
  font-size: 14px;
`;

const BlackSubText = styled.span`
  margin-top: 8px;
  color: #a7b0c0;
  font-weight: 400;
  font-size: 15px;
  color: ${colors.Black};
  font-size: 14px;
`;

const Heading = styled(SubText)`
  margin-top: 60px;
  font-weight: 500;
  font-size: 18px;
  b {
    font-weight: 1000;
    color: #12121d;
  }
`;
const AvartarBig = styled(Avartar)`
  margin-top: 60px;
  width: 174px;
  height: 174px;
`;

const Name = styled.span`
  color: ${colors.Black};
  font-weight: bold;
  font-size: 20px;
`;

const InnerContainer = styled.div``;

const InnerSubject = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.MidGray};
`;

const InnerContent = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: ${colors.Black};
  margin-left: 30px;
`;

export const IndicatorBox = styled.div`
  background-color: ${colors.LightBlue};
  border-radius: 4px;
  color: #18a0fb;
  font-size: 13px;
  line-height: 20px;
  padding: 13px 15px;
  margin: 20px 0;
`;

const Job = styled.div`
  margin-left: 10px;
  color: #8c94a4;
  font-weight: 500;
`;

export const ChattingButton = styled(InterestTag)`
  margin-left: 10px;
  padding: 7px 16px;
  border-radius: 6px;
  p {
    font-size: 14px;
    font-weight: bold;
  }
  cursor: pointer;
`;

const TagOnName = styled(InterestTag)`
  /* margin-left: 10px; */
  padding: 7px 16px;
  /* border-radius: 6px; */
  background-color: transparent;

  p {
    font-size: 14px;
    font-weight: normal;
    color: #8c94a4;
  }
`;
