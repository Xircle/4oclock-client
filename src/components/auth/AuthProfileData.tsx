import styled from "styled-components";
import {
  ContainerwithLeftRightMargin,
  Heading,
  colors,
  MidInput,
  FlexDiv,
  GenderText,
  Label,
  BigTextArea,
  NextButton,
  SpaceForNavBar,
} from "../../styles";
import {
  faCheckCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { AuthState, AuthAction } from "./types";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileData({ onNext, state, dispatch }: Props) {
  const univs: string[] = ["고려대학교", "연세대학교"];
  const [nameError, SetNameError] = useState<boolean>(false);
  const [univError, SetUnivError] = useState<boolean>(false);
  const [ageError, SetAgeError] = useState<boolean>(false);
  const [genderError, SetGenderError] = useState<boolean>(false);
  const [titleError, SetTitleError] = useState<boolean>(false);
  const [bioError, SetBioError] = useState<boolean>(false);
  const [detailAddress, setDetailAddress] = useState(state.location);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (!detailAddress) currentLocationScript();
    return () => setLocationLoading(false);
  }, []);

  const searchDetailAddressFromCoords = (
    coords: {
      latitude: number;
      longitude: number;
    },
    callback: (result: any, status: boolean) => void
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    console.log(coords);
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    if (coords.longitude && coords.latitude)
      geocoder.coord2Address(coords.longitude, coords.latitude, callback);
  };

  // 마운트 될 때 실행
  const currentLocationScript = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          searchDetailAddressFromCoords(
            { latitude, longitude },
            function (result: any, status: boolean) {
              if (status === window.kakao.maps.services.Status.OK) {
                const fullAddr = result[0].address.address_name;
                const newAddr = fullAddr.split(" ");
                console.log(fullAddr, newAddr);
                setDetailAddress(
                  newAddr[0] + " " + newAddr[1] + " " + newAddr[2]
                );
                setLocationLoading(false);
                dispatch({
                  type: "setLocation",
                  payload: newAddr[0] + " " + newAddr[1] + " " + newAddr[2],
                });
              }
            }
          );
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) setLocationLoading(false);
        }
      );
    }
  };

  const SetErrorAll = (param: boolean) => {
    SetNameError(param);
    SetUnivError(param);
    SetAgeError(param);
    SetGenderError(param);
    SetTitleError(param);
    SetBioError(param);
  };
  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "학교를 선택해주세요",
    "19 ~ 40 사이의 나이를 입력해주세요",
    "성별을 선택해주세요",
    "1자에서 8자 이내로 입력해주세요",
    "1자 이상의 자기소개를 입력해주세요",
  ];

  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) return true;
    return false;
  };

  function Validate(
    univ: string = state.university,
    gender: string = state.gender
  ): void {
    if (state.name.length <= 0 || state.name.length > 20) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetNameError(true);
    } else if (!univs.includes(univ)) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetUnivError(true);
    } else if (!CheckAge(Number(state.age))) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetAgeError(true);
    } else if (gender !== "male" && gender !== "Female") {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetGenderError(true);
    } else if (state.title.length === 0 || state.title.length > 8) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetTitleError(true);
    } else if (state.bio.length < 1) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetBioError(true);
    } else {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: true });
    }
  }

  return (
    <ContainerwithLeftRightMargin>
      <Heading>프로필 만들기</Heading>

      <form>
        <MidInput
          name="name"
          placeholder="Username"
          style={
            nameError
              ? { marginTop: "24px", borderColor: colors.Red }
              : { marginTop: "24px", borderColor: colors.BareGray }
          }
          type="text"
          value={state.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        />
        {nameError && <ErrorMessage>{errorMessages[0]}</ErrorMessage>}
        <select
          id=""
          name="University"
          value={
            state.isGraduate
              ? state.university + " 졸업"
              : state.university + " 재학"
          }
          style={
            univError
              ? {
                  marginTop: "12px",
                  borderColor: colors.Red,
                  color: colors.Black,
                }
              : { marginTop: "12px", color: colors.Black }
          }
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({
              type: "setUniversity",
              payload: e.target.value.toString().split(" ")[0],
            });
            dispatch({
              type: "setIsGraduate",
              payload: e.target.value.toString().split(" ")[1] === "졸업",
            });
            Validate(e.target.value.toString().split(" ")[0]);
          }}
        >
          <option value="" style={{ color: colors.BareGray }}>
            학교
          </option>
          <option value="고려대학교 재학" style={{ color: colors.Black }}>
            고려대학교 재학
          </option>
          <option value="고려대학교 졸업" style={{ color: colors.Black }}>
            고려대학교 졸업
          </option>
          <option value="연세대학교 재학" style={{ color: colors.Black }}>
            연세대학교 재학
          </option>
          <option value="연세대학교 졸업" style={{ color: colors.Black }}>
            연세대학교 졸업
          </option>
        </select>
        {univError && <ErrorMessage>{errorMessages[1]}</ErrorMessage>}
        <MidInput
          placeholder="나이"
          type="number"
          name="Age"
          style={
            ageError
              ? { marginTop: "12px", borderColor: colors.Red }
              : { marginTop: "12px" }
          }
          value={state.age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setAge", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        ></MidInput>
        {ageError && <ErrorMessage>{errorMessages[2]}</ErrorMessage>}
        {/* <SubText>나이는 20초 20중 20후 30초 방식으로 표기가되요!</SubText> */}
        <FlexDiv style={{ justifyContent: "normal", marginTop: "20px" }}>
          <span
            style={{
              justifyContent: "normal",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({ type: "setGender", payload: "male" });
              Validate(state.university, "male");
            }}
          >
            {state.gender === "male" ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={colors.MidBlue}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                color={genderError ? colors.Red : colors.LightGray}
                size="lg"
              />
            )}
            <GenderText
              style={
                genderError
                  ? { marginLeft: "5px", color: colors.Red }
                  : { marginLeft: "5px" }
              }
            >
              남성
            </GenderText>
          </span>
          <span
            style={{
              justifyContent: "normal",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({ type: "setGender", payload: "Female" });
              Validate(state.university, "Female");
            }}
          >
            {state.gender === "Female" ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color={colors.MidBlue}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                color={genderError ? colors.Red : colors.LightGray}
                size="lg"
              />
            )}
            <GenderText
              style={
                genderError
                  ? { marginLeft: "5px", color: colors.Red }
                  : { marginLeft: "5px" }
              }
            >
              여성
            </GenderText>
          </span>
        </FlexDiv>
        {genderError && <ErrorMessage>{errorMessages[3]}</ErrorMessage>}
        <Label>계열이나 직업을 적어주세요</Label>
        <MidInput
          name="title"
          placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
          style={
            titleError
              ? { fontSize: "12px", borderColor: colors.Red }
              : { fontSize: "12px" }
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
          value={state.title}
          onKeyUp={() => Validate()}
        />
        {titleError && <ErrorMessage>{errorMessages[4]}</ErrorMessage>}
        <Label>간단한 자기소개</Label>
        <BigTextArea
          name="bio"
          value={state.bio}
          placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
           요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
          style={
            bioError
              ? {
                  fontSize: "12px",
                  lineHeight: "18px",
                  borderColor: colors.Red,
                }
              : { fontSize: "12px", lineHeight: "18px" }
          }
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: "setBio", payload: e.target.value })
          }
          onKeyUp={() => Validate()}
        />
        {bioError && <ErrorMessage>{errorMessages[5]}</ErrorMessage>}
        <p
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            color: colors.MidGray,
            marginTop: "5px",
          }}
        >
          <div></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={colors.LightGray}
              size="lg"
              style={{ marginRight: "8px" }}
            />
            {locationLoading ? (
              <ClipLoader
                color={colors.MidBlue}
                size={15}
                loading={locationLoading}
              />
            ) : (
              detailAddress || "대한민국 어딘가"
            )}
          </div>
        </p>
        <SpaceForNavBar> </SpaceForNavBar>
        <NextButton
          type="submit"
          disabled={!state.stage2Valid}
          onClick={onNext}
        >
          다음
        </NextButton>
      </form>
    </ContainerwithLeftRightMargin>
  );
}

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 8px;
  margin-left: 5px;
  color: ${colors.Red};
`;
