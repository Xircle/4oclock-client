import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  Avartar,
  SubText,
  colors,
  InterestTag,
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  FlexDiv,
  MainBtn,
  SpaceForNavBar,
  BottomNavBarContainer,
} from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../../lib/api/types";
import { seeRandomProfile } from "../../lib/api/seeRandomProfile";
import { AgeNumberToString } from "../../lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import routes from "../../routes";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import PageTitle from "../../components/PageTitle";
import { ChattingButton, IndicatorBox } from "./ParticipantProfilePage";
import { RouteComponentProps } from "react-router-dom";
import "./FriendPage.css";

interface Props extends RouteComponentProps {}

export default function FriendsPage({ history }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [age, SetAge] = useState<string>("");

  const { data: randomProfileData, refetch, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["randomProfile"], seeRandomProfile, {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      alert("친구 프로필은 로그인을 하셔야 볼 수 있어요!");
      window.location.href = routes.root;
    }
  }, []);

  useEffect(() => {
    if (randomProfileData) {
      SetAge(AgeNumberToString(randomProfileData.age));
    }
  }, [randomProfileData?.age]);

  const refetchRandomProfileData = () => {
    refetch();
  };

  return (
    <ContainerFlexColumn>
      <PageTitle title="랜덤 프로필" />
      <ContainerwithLeftRightMargin>
        <Heading style={{ marginTop: "40px" }}>
          <IndicatorBox>
            네시모해를 가입한 친구들과 소통할 수 있는 탭이에요! 채팅기능은 개발
            중입니다 🔥
          </IndicatorBox>
          <b>
            {randomProfileData?.location ? (
              <>{randomProfileData?.location} 근처 친구</>
            ) : (
              "대한민국 어딘가"
            )}
          </b>
          <YGEContainer>
            {/* <FlexDiv style={{ justifyContent: "start" }}> */}
            <YGECheckBox type="checkbox" id="YGE" name="YGE" />
            <label htmlFor="YGE">연고이팅친구만 보기</label>
            {/* </FlexDiv> */}
          </YGEContainer>
        </Heading>

        <FlexDiv style={{ position: "relative" }}>
          <AvartarBig
            src={randomProfileData?.profileImageUrl || "/avatar/2donny.png"}
            alt="friend-profile"
            onClick={() => {
              history.push(`/image/${0}`, {
                profileImageUrls: [randomProfileData?.profileImageUrl],
              });
            }}
          />
        </FlexDiv>

        <FlexDiv style={{ marginTop: "15px" }}>
          <Name>{randomProfileData?.username || "써클 개발자"}</Name>
        </FlexDiv>

        <FlexDiv>
          <TagOnName>
            <p>{randomProfileData?.job || "18학번 헌내기"}</p>
          </TagOnName>
        </FlexDiv>

        {/* <FlexDiv style={{ marginTop: "5px" }}>
          <ChattingButton onClick={() => alert("개발중")}>
            <p>채팅하기</p>
          </ChattingButton>
        </FlexDiv> */}

        <InnerContainer style={{ marginTop: "45px" }}>
          <InnerSubject>학교</InnerSubject>
          <InnerContent>
            {randomProfileData?.university || "고려대학교"}
          </InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "6px" }}>
          <InnerSubject>나이</InnerSubject>
          <InnerContent>{age || "23살"}</InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "6px" }}>
          <InnerSubject>성별</InnerSubject>
          <InnerContent>
            {randomProfileData
              ? randomProfileData.gender === "Male"
                ? "남"
                : "여"
              : "남"}
          </InnerContent>
        </InnerContainer>
        {randomProfileData?.activities && (
          <InnerContainer style={{ marginTop: "6px" }}>
            <InnerSubject>활동</InnerSubject>
            <InnerContent>{randomProfileData?.activities}</InnerContent>
          </InnerContainer>
        )}

        <InnerContainer style={{ marginTop: "25px" }}>
          <InnerContent
            style={{ marginLeft: "0px", fontWeight: 400, fontSize: "14px" }}
          >
            {randomProfileData?.shortBio || `안녕하세요!`}
          </InnerContent>
        </InnerContainer>
      </ContainerwithLeftRightMargin>
      <SpaceForNavBar> </SpaceForNavBar>

      {isLoading ||
        (isFetching && (
          <>
            <LoaderBackdrop />
            <LoaderWrapper>
              <ClipLoader
                loading={isLoading || isFetching}
                color={colors.MidBlue}
                css={{ name: "width", styles: "border-width: 4px;" }}
                size={30}
              />
            </LoaderWrapper>
          </>
        ))}
      <BottomButtonsContainer>
        <NextButtonFriend onClick={refetchRandomProfileData}>
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </NextButtonFriend>
      </BottomButtonsContainer>
      <BottomNavBar selectedItem="friends" />
    </ContainerFlexColumn>
  );
}

const BottomButtonsContainer = styled(BottomNavBarContainer)`
  bottom: 75px;
  
`;

const YGECheckBox = styled.input`
  width: 14px;
  height: 14px;
  padding: 0px;
`;

const YGEContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 16px;
  label {
    padding-bottom: 2px;
    font-weight: 400;
    font-size: 12px;
    color: ${colors.MidGray};
  }
`;

const NextButtonFriend = styled(MainBtn)`
  width: 46%;
  height: 50px;
  background-color: #f9f9f9;
  color: #000;
`;

const Heading = styled(SubText)`
  color: ${colors.Black};
  margin-top: 60px;
  font-weight: 500;
  font-size: 18px;
  b {
    font-weight: 1000;
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

const TagOnDetail = styled(InterestTag)`
  padding: 7px 16px;
  border-radius: 6px;
  display: inline-block;
  margin-right: 10px;
  background-color: #dbedff;
  margin-bottom: 8px;
  p {
    margin: auto;
    font-size: 14px;
    font-weight: normal;
    color: ${colors.MidBlue};
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const InnerContainer = styled.div``;

const TagInnerContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`;

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
