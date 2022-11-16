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
  MainBtn,
} from "../../styles/styles";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { AuthState, AuthAction } from "./types";
import BottomModal from "../UI/BottomModal";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileData({ onNext, state, dispatch }: Props) {
  const [nameError, SetNameError] = useState<boolean>(false);
  const [univError, SetUnivError] = useState<boolean>(false);
  const [ageError, SetAgeError] = useState<boolean>(false);
  const [genderError, SetGenderError] = useState<boolean>(false);
  const [bioError, SetBioError] = useState<boolean>(false);
  const [detailAddress, setDetailAddress] = useState(state.location);
  const [locationLoading, setLocationLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
  };

  useEffect(() => {
    if (!detailAddress) currentLocationScript();
    return () => setLocationLoading(false);
  }, []);

  const searchDetailAddressFromCoords = (
    coords: {
      latitude: number;
      longitude: number;
    },
    callback: (result: any, status: boolean) => void,
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

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
                setDetailAddress(
                  newAddr[0] + " " + newAddr[1] + " " + newAddr[2],
                );
                setLocationLoading(false);
                dispatch({
                  type: "setLocation",
                  payload: newAddr[0] + " " + newAddr[1] + " " + newAddr[2],
                });
              }
            },
          );
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) setLocationLoading(false);
        },
      );
    }
  };

  const SetErrorAll = (param: boolean) => {
    SetNameError(param);
    SetUnivError(param);
    SetAgeError(param);
    SetGenderError(param);
    SetBioError(param);
  };
  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "대학교를 입력해주세요",
    "19-40사이의 나이를 입력해주세요. 20초 20중 20후 30초로 보여져요!",
    "성별을 선택해주세요",
    "15자 이내로 적어주세요.",
    "1자 이상의 자기소개를 입력해주세요",
  ];

  const CheckAge = (age: number) => {
    if (age >= 19 && age <= 40) return true;
    return false;
  };

  function Validate(
    univ: string = state.university,
    gender: string = state.gender,
  ): void {
    if (state.name.length <= 0 || state.name.length > 20) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetNameError(true);
    } else if (!univ) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetUnivError(true);
    } else if (!CheckAge(Number(state.age))) {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetAgeError(true);
    } else if (gender !== "male" && gender !== "female") {
      SetErrorAll(false);
      dispatch({ type: "setStage2Valid", payload: false });
      SetGenderError(true);
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
    <>
      <ContainerwithLeftRightMargin>
        <Heading>프로필 만들기</Heading>

        <form>
          <MidInput
            name="name"
            placeholder="Username"
            style={
              nameError
                ? { marginTop: "24px", borderColor: colors.StrongLime }
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
          <SchoolModalButton onClick={openModal}>
            <SchoolText>학교</SchoolText>
            <FontAwesomeIcon icon={faSearch} />
          </SchoolModalButton>
          {univError && <ErrorMessage>{errorMessages[1]}</ErrorMessage>}
          <MidInput
            placeholder="나이"
            type="number"
            name="Age"
            style={
              ageError
                ? { marginTop: "12px", borderColor: colors.StrongLime }
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
                  color={colors.StrongLime}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircle}
                  color={genderError ? colors.StrongLime : colors.LightGray}
                  size="lg"
                />
              )}
              <GenderText
                style={
                  genderError
                    ? { marginLeft: "5px", color: colors.StrongLime }
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
                dispatch({ type: "setGender", payload: "female" });
                Validate(state.university, "female");
              }}
            >
              {state.gender === "female" ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color={colors.StrongLime}
                  size="lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircle}
                  color={genderError ? colors.StrongLime : colors.LightGray}
                  size="lg"
                />
              )}
              <GenderText
                style={
                  genderError
                    ? { marginLeft: "5px", color: colors.StrongLime }
                    : { marginLeft: "5px" }
                }
              >
                여성
              </GenderText>
            </span>
          </FlexDiv>
          {genderError && <ErrorMessage>{errorMessages[3]}</ErrorMessage>}
          <Label>계열 or 직업을 적어주세요</Label>
          <MidInput
            name="title"
            placeholder="ex. 새내기 / 스타트업 마케터 / AI중독 문과생..."
            style={{ fontSize: "12px" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "setTitle", payload: e.target.value })
            }
            value={state.title}
            onKeyUp={() => Validate()}
          />
          <ErrorMessage>
            계열이나, 직업을 활용해서 적으시면 좋아요 :)
          </ErrorMessage>
          <Label>자기소개</Label>
          <BigTextArea
            name="bio"
            value={state.bio}
            placeholder="ex. 어떤거에 관심이 있는지 써주시면 좋아요!
          요즘 요리에 푹 빠져서 요리강의만 보고 집콕하고 있어요... 맛있는거 먹고싶어요 ><"
            style={
              bioError
                ? {
                    fontSize: "12px",
                    lineHeight: "18px",
                    borderColor: colors.MidBlue,
                  }
                : { fontSize: "12px", lineHeight: "18px" }
            }
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({ type: "setBio", payload: e.target.value })
            }
            onKeyUp={() => Validate()}
          />
          {bioError && <ErrorMessage>{errorMessages[5]}</ErrorMessage>}

          <SpaceForNavBar></SpaceForNavBar>
          <NextButton
            type="submit"
            disabled={!state.stage2Valid}
            onClick={onNext}
          >
            가입하기
          </NextButton>
        </form>
      </ContainerwithLeftRightMargin>
      <BottomModal onClose={closeModal} open={modalOpened}>
        <ModalWrapper>
          <UpModalWrapper>
            <SearchBar
              name="univ"
              placeholder="ex. 기안대학교"
              style={{ fontSize: "12px" }}
            />
            <SearchResultContainer></SearchResultContainer>
          </UpModalWrapper>
          <DownModalWrapper>
            <SearchButton />
          </DownModalWrapper>
        </ModalWrapper>
      </BottomModal>
    </>
  );
}

const SearchButton = styled(MainBtn)``;

const UpModalWrapper = styled.div``;

const DownModalWrapper = styled.div``;

const ErrorMessage = styled.p`
  margin-top: 7px;
  font-size: 8px;
  margin-left: 5px;
  color: ${colors.StrongLime};
`;

const SchoolModalButton = styled.div`
  width: 100%;
  &:hover {
    opacity: 0.7;
  }
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #c4cbd8;
  border-radius: 8px;
  font-size: 14px;
  padding: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 301px;
`;

const SchoolText = styled.div`
  font-size: 14px;
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const SearchBar = styled(MidInput)``;

const SearchResultContainer = styled.div``;

const ModalRow = styled.div``;

const UnivNameTag = styled.div``;

const UnivAdresTag = styled.div``;
