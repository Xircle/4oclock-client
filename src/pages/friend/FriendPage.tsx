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
import { IndicatorBox } from "./ParticipantProfilePage";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

export default function FriendsPage({ history }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [age, SetAge] = useState<string>("");

  const {
    data: randomProfileData,
    refetch,
    isLoading,
    isFetching,
  } = useQuery<UserProfile | undefined>(["randomProfile"], seeRandomProfile, {
    retry: 1,
    refetchOnMount: false,
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
            네시모해를 가입한 친구들과 소통할 수 있는 탭이에요! 채팅기능을 개발
            중입니다 🔥
          </IndicatorBox>
          <b>
            {randomProfileData?.location ? (
              <>{randomProfileData?.location} 근처 친구</>
            ) : (
              "대한민국 어딘가"
            )}
          </b>
        </Heading>
        <FlexDiv style={{ position: "relative" }}>
          <NextButtonFriend onClick={refetchRandomProfileData}>
            <FontAwesomeIcon icon={faArrowRight} size="lg" />
          </NextButtonFriend>
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

      <BottomNavBar selectedItem="friends" />
    </ContainerFlexColumn>
  );
}

const NextButtonFriend = styled(MainBtn)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(115px);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: -10px -10px 30px #ffffff, 10px 10px 20px rgba(174, 174, 192, 0.3);
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
  width: 200px;
  height: 200px;
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
    color: ${colors.BareGray};
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
