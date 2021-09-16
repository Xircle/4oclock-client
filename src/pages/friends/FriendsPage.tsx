import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  Container,
  Avartar,
  SubText,
  colors,
  Tag,
  InterestTag,
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  FlexDiv,
  MainBtn,
} from "../../styles";
import MainPicDummy from "../../dummyResources/MainPicDummy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {}

export default function FriendsPage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading style={{ marginTop: "40px" }}>
          <b>강남구</b> 근처 친구
        </Heading>
        <FlexDiv>
          <AvartarBig src={MainPicDummy} />
        </FlexDiv>
        <FlexDiv style={{ marginTop: "15px" }}>
          <Name>리안</Name>
          <TagOnName>
            <p>개발자</p>
          </TagOnName>
        </FlexDiv>
        <InnerContainer style={{ marginTop: "45px" }}>
          <InnerSubject>학교</InnerSubject>
          <InnerContent>고려대학교</InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "6px" }}>
          <InnerSubject>나이</InnerSubject>
          <InnerContent>20대 초반</InnerContent>
        </InnerContainer>
        <InnerContainer style={{ marginTop: "25px" }}>
          <InnerContent
            style={{ marginLeft: "0px", fontWeight: 400, fontSize: "14px" }}
          >
            수학을 너무 싫어하고... 요즘 너무 심심해요... 관련 있으신 분들과
            이야기 나누고 싶네요
          </InnerContent>
        </InnerContainer>
        {/* <TagInnerContainer>
          <TagOnDetail>
            <div>
              <p>스타트업</p>
            </div>
          </TagOnDetail>
          <TagOnDetail>
            <div>
              <p>동네친구</p>
            </div>
          </TagOnDetail>
          <TagOnDetail>
            <div>
              <p>요리</p>
            </div>
          </TagOnDetail>
          <TagOnDetail>
            <div>
              <p>와인</p>
            </div>
          </TagOnDetail>
          <TagOnDetail>
            <div>
              <p>패션</p>
            </div>
          </TagOnDetail>
        </TagInnerContainer> */}
      </ContainerwithLeftRightMargin>
      <NextButtonFriend>
        다른 친구 찾기{" "}
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{ marginLeft: "15px" }}
          size="lg"
        />
      </NextButtonFriend>

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
