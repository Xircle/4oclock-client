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
  MidInput,
  SmallInput,
  GenderText,
  BigTextArea,
  Label,
  FileLabel,
} from "../../styles";
import { DummyAvartar, DummyProfileData } from "../../static/dummyData";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { getUser } from "../../lib/api/getUser";
import { useQuery } from "react-query";
import { UserData } from "../../lib/api/types";
import { AgeNumberToString } from "../../lib/utils";
import routes from "../../routes";

interface Props {}

export default function EditProfilePage(props: Props) {
  const { data: userData, isLoading, refetch } = useQuery<UserData | undefined>(
    "userProfile",
    () => getUser(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [localImageSrc, setLocalImageSrc] = useState<string | undefined | null>(
    userData?.profileImageUrl
  );
  // state.profileImgUrl
  // set value here
  const [localName, setLocalName] = useState<string | undefined | null>(
    userData?.username
    // set value here
  );
  const [localBio, setLocalBio] = useState<string | undefined | null>(
    userData?.shortBio
  );
  const [localJob, setLocalJob] = useState<string | undefined | null>(
    userData?.job
  );
  const [localValidation, setLocalValidation] = useState<boolean[]>([
    true,
    true,
    true,
  ]);

  useEffect(() => {
    setLocalImageSrc(userData?.profileImageUrl);
  }, [userData?.profileImageUrl]);

  useEffect(() => {
    setLocalName(userData?.username);
  }, [userData?.username]);

  useEffect(() => {
    setLocalBio(userData?.shortBio);
  }, [userData?.shortBio]);

  useEffect(() => {
    setLocalJob(userData?.job);
  }, [userData?.job]);

  const uploadFile = () => {
    const formData = new FormData();
    // formData.append('profileImageFile')
    // state.name && formData.append("username", state.name);
  };

  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "1자에서 8자 이내로 입력해주세요",
    "1자 이상의 자기소개를 입력해주세요",
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0 || e.target.value.length >= 20) {
      setLocalValidation([false, localValidation[1], localValidation[2]]);
    }
    setLocalName(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1) {
      setLocalValidation([localValidation[0], false, localValidation[2]]);
    }
    setLocalBio(e.target.value);
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0 || e.target.value.length > 8) {
      setLocalValidation([localValidation[0], localValidation[1], false]);
    }
    setLocalJob(e.target.value);
  };

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0]?.size;

    if (__size > 10000000) {
      return alert(
        "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
      );
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      setLocalImageSrc(e.target!.result as string);
      // dispatch({
      //   type: "setProfileImgUrl",
      //   payload: e.target!.result as string,
      // });
    };
    // dispatch({ type: "setProfileImgFile", payload: __file });
  };

  return (
    <ContainerFlexColumn>
      <PageTitle title="프로필 수정" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>프로필 수정하기</Heading>
          <FileLabel htmlFor="input-file">
            <AvartarProfile
              src={localImageSrc || "/avatar/anonymous_user.png"}
            />
            <input
              id="input-file"
              type="file"
              onChange={handleFileOnChange}
              style={{ display: "none" }}
            />
          </FileLabel>
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
            학교와 나이, 성별 변경은 불가능해요. 수정을 원하실 경우{" "}
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
              value={localName || ""}
              onChange={handleNameChange}
              style={
                localValidation[0]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
            />
            {!localValidation[0] && (
              <ErrorMessage>{errorMessages[0]}</ErrorMessage>
            )}
            <FlexDiv
              style={{
                justifyContent: "normal",
                marginTop: "12px",
              }}
            >
              <SmallInput
                name="school"
                disabled
                style={{ marginTop: "0px" }}
                value={userData?.university || "학교"}
              />
            </FlexDiv>
            <SmallInput
              name="age"
              value={userData ? AgeNumberToString(userData.age) : "비밀"}
              disabled
            />
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
              value={localBio || ""}
              onChange={handleBioChange}
              style={
                localValidation[1]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
            />
            {!localValidation[1] && (
              <ErrorMessage>{errorMessages[1]}</ErrorMessage>
            )}
            <Label>계열이나 직업을 적어주세요</Label>
            <MidInput
              name="job"
              placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
              value={localJob || ""}
              onChange={handleJobChange}
              style={
                localValidation[2]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
            />
            {!localValidation[2] && (
              <ErrorMessage>{errorMessages[2]}</ErrorMessage>
            )}
          </form>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>
      <SpaceForNavBar></SpaceForNavBar>
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

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 8px;
  margin-left: 5px;
  color: ${colors.MidBlue};
`;
