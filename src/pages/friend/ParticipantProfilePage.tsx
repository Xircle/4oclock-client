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
import { useEffect } from "react";
import { useQuery } from "react-query";
import { UserProfile } from "../../lib/api/types";
import { AgeNumberToString } from "../../lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import routes from "../../routes";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import { seeUserById } from "../../lib/api/seeUserById";
import { useLocation } from "react-router-dom";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import PageTitle from "../../components/PageTitle";

interface LocationState {
  id: string;
}
export default function ParticipantProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation<LocationState>();

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
    <ContainerFlexColumn>
      <PageTitle title="참여자 프로필" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading style={{ marginTop: "20px" }}>
            <IndicatorBox>
              원하는 친구와 매칭이 되고 싶나요? 개발자에게 연락을 주시면
              도와드릴게요 :)
            </IndicatorBox>
            <b>
              {userProfileData?.location
                ? userProfileData?.location + " 근처 친구"
                : "대한민국 어딘가"}
            </b>
          </Heading>
          <FlexDiv>
            <AvartarBig
              src={
                userProfileData?.profileImageUrl || "/avatar/anonymous_user.png"
              }
              alt="friend-profile"
            />
          </FlexDiv>

          <FlexDiv style={{ marginTop: "15px" }}>
            <Name>{userProfileData?.username || "써클개발자"}</Name>
            <Job>{userProfileData?.job || "18학번 헌내기"}</Job>
          </FlexDiv>

          <FlexDiv style={{ marginTop: "15px" }}>
            {userProfileData?.id !== storage.getItem(CURRENT_USER)["uid"] && (
              <ChattingButton onClick={() => alert("채팅하기는 개발중이예요!")}>
                <p>채팅하기</p>
              </ChattingButton>
            )}
          </FlexDiv>

          <InnerContainer style={{ marginTop: "45px" }}>
            <InnerSubject>학교</InnerSubject>
            <InnerContent>
              {userProfileData?.university || "고려대학교"}
            </InnerContent>
          </InnerContainer>

          <InnerContainer style={{ marginTop: "6px" }}>
            <InnerSubject>나이</InnerSubject>
            <InnerContent>
              {userProfileData
                ? AgeNumberToString(userProfileData.age)
                : "23살"}
            </InnerContent>
          </InnerContainer>

          <InnerContainer style={{ marginTop: "6px" }}>
            <InnerSubject>성별</InnerSubject>
            <InnerContent>
              {userProfileData
                ? userProfileData.gender === "Male"
                  ? "남"
                  : "여"
                : "남"}
            </InnerContent>
          </InnerContainer>
          {userProfileData?.activities && (
            <InnerContainer style={{ marginTop: "6px" }}>
              <InnerSubject>활동</InnerSubject>
              <InnerContent>{userProfileData?.activities}</InnerContent>
            </InnerContainer>
          )}
          <InnerContainer style={{ marginTop: "25px" }}>
            <InnerContent
              style={{ marginLeft: "0px", fontWeight: 400, fontSize: "14px" }}
            >
              {userProfileData?.shortBio ||
                `가슴뛰는 청춘 새로운 네트워킹을 써클에서 경험하세요!`}
            </InnerContent>
          </InnerContainer>
        </ContainerwithLeftRightMargin>
        <SpaceForNavBar></SpaceForNavBar>
      </BackButtonLayout>

      {isLoading && (
        <>
          <LoaderBackdrop />
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

      <BottomNavBar selectedItem="friends" />
    </ContainerFlexColumn>
  );
}

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
  width: 200px;
  height: 200px;
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
  background-color: #dbedff;
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

const ChattingButton = styled(InterestTag)`
  margin-left: 10px;
  padding: 7px 16px;
  border-radius: 6px;
  p {
    font-size: 14px;
    font-weight: bold;
  }
  cursor: pointer;
`;
