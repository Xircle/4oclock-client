import styled from "styled-components";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  BottomFixedButtonContainer,
  BottomFixedButtoninContainer,
  FlexDiv,
  Avartar,
  colors,
  SpaceForNavBar,
  SubText,
  MidInput,
  SmallInput,
  GenderText,
  BigTextArea,
  Label,
} from "../../styles";
import { DummyAvartar, DummyProfileData } from "../../dummyResources/dummyData";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

export default function ModifyProfilePage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>프로필 수정하기</Heading>
        <FlexDiv>
          <AvartarProfile src={DummyAvartar} />
        </FlexDiv>
        <FlexDiv
          style={{
            marginTop: "11px",
            fontSize: "13px",
            fontWeight: 700,
            color: colors.MidBlue,
          }}
        >
          <p>프로필사진 수정하러가기</p>
        </FlexDiv>
        <WarningText>
          학교와 나이, 관심사 변경은 불가능해요. 수정을 원하실 경우{" "}
          <b>마이페이지 {">"} 문의하기</b>에서 상담원에게 문의해주세요!
        </WarningText>
        <LocationText>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color={colors.LightGray}
            size="lg"
            style={{ marginRight: "8px" }}
          />
          {DummyProfileData.location ? DummyProfileData.location : "대한민국"}
        </LocationText>
        <form>
          <MidInput
            name="name"
            placeholder="Username"
            value={DummyProfileData.userName}
          />
          <FlexDiv
            style={{
              justifyContent: "normal",
              marginTop: "12px",
            }}
          >
            <SmallInput
              name="school"
              placeholder="고려대학교"
              disabled
              style={{ marginTop: "0px" }}
              value={DummyProfileData.university}
            />
          </FlexDiv>
          <SmallInput name="age" placeholder="20대 초반" disabled />
          <FlexDiv style={{ justifyContent: "normal", marginTop: "20px" }}>
            <input type="radio" name="gender" id="male" disabled checked />
            <GenderText>남성</GenderText>
            <input
              type="radio"
              name="gender"
              id="female"
              disabled
              style={{ marginLeft: "32px" }}
            />
            <GenderText>여성</GenderText>
          </FlexDiv>

          <Label>간단한 자기소개</Label>
          <BigTextArea
            name="selfpromotext"
            placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
           요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
          />
          <Label>계열이나 직업을 적어주세요</Label>
          <MidInput
            name="job"
            placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
            disabled
          />
          <Label>관심사</Label>
          <MidInput
            name="interest"
            placeholder="#스타트업#술#한강에서 치맥"
            disabled
          />
          <SpaceForNavBar />
        </form>
      </ContainerwithLeftRightMargin>
      <BottomFixedButtonContainer>
        <BottomFixedButtoninContainer>수정하기</BottomFixedButtoninContainer>
      </BottomFixedButtonContainer>
    </ContainerFlexColumn>
  );
}

const WarningText = styled.p`
  margin-top: 18px;
  font-weight: normal;
  font-size: 10px;
  color: ${colors.MidGray};
  b {
    font-weight: 900;
  }
`;

const LocationText = styled.p`
  font-size: 14px;
  margin-top: 12px;
  color: ${colors.LightGray};
`;

const AvartarProfile = styled(Avartar)`
  width: 125px;
  height: 125px;
  margin-top: 45px;
`;
