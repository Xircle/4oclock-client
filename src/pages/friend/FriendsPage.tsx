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
} from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { RandomProfileData } from "../../lib/api/types";
import { seeRandomProfile } from "../../lib/api/seeRandomProfile";
import { AgeNumberToString } from "../../lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import routes from "../../routes";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";

export default function FriendsPage() {
  const [age, SetAge] = useState<string>("비밀");

  const {
    data: randomProfileData,
    refetch,
    isLoading,
  } = useQuery<RandomProfileData>(["randomProfile"], () => seeRandomProfile(), {
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
      <ContainerwithLeftRightMargin>
        <Heading style={{ marginTop: "40px" }}>
          <b>
            {randomProfileData?.location ? (
              <>{randomProfileData?.location} 근처 친구</>
            ) : (
              "대한민국 어딘가"
            )}
          </b>
        </Heading>
        <FlexDiv>
          <AvartarBig
            src={randomProfileData?.profileImageUrl}
            alt="friend-profile"
          />
        </FlexDiv>
        <FlexDiv style={{ marginTop: "15px" }}>
          <Name>{randomProfileData?.username}</Name>
          <TagOnName>
            <p>{randomProfileData?.job}</p>
          </TagOnName>
        </FlexDiv>
        <InnerContainer style={{ marginTop: "45px" }}>
          <InnerSubject>학교</InnerSubject>
          <InnerContent>{randomProfileData?.university}</InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "6px" }}>
          <InnerSubject>나이</InnerSubject>
          <InnerContent>{age}</InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "25px" }}>
          <InnerContent
            style={{ marginLeft: "0px", fontWeight: 400, fontSize: "14px" }}
          >
            {randomProfileData?.shortBio}
          </InnerContent>
        </InnerContainer>
      </ContainerwithLeftRightMargin>
      <NextButtonFriend onClick={refetchRandomProfileData}>
        다른 친구 찾기{" "}
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{ marginLeft: "15px" }}
          size="lg"
        />
      </NextButtonFriend>

      {isLoading && (
        <>
          <LoaderBackdrop />
          <LoaderWrapper>
            <ClipLoader
              loading={isLoading}
              color={colors.MidBlue}
              css={{ name: "width", styles: "border-width: 4px;" }}
              size={40}
            />
          </LoaderWrapper>
        </>
      )}

      <BottomNavBar selectedItem="friends" />
    </ContainerFlexColumn>
  );
}

const NextButtonFriend = styled(MainBtn)`
  position: fixed;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
  border-radius: 30px;
  width: 200px;
`;

const Heading = styled(SubText)`
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
  margin-left: 10px;
  padding: 7px 16px;
  border-radius: 6px;
  p {
    font-size: 14px;
    font-weight: normal;
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
