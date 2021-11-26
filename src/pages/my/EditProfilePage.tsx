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
  BigTextArea,
  Label,
  LabelSpan,
  FileLabel,
} from "../../styles/styles";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { getUser } from "../../lib/api/getUser";
import { useMutation, useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { UserData } from "../../lib/api/types";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import diff from "object-diff";
import _ from "lodash";
import { editProfile } from "../../lib/api/editProfile";
import { toast } from "react-toastify";
import routes from "../../routes";
import { RouteComponentProps } from "react-router-dom";
import optimizeImage from "../../lib/optimizeImage";

export interface ProfileData {
  username?: string;
  shortBio?: string;
  profileImageFile?: File;
  profileImageUrl?: string;
  job?: string;
  location?: string;
  activities?: string;
  gender?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
}

interface Props extends RouteComponentProps<any> {}

export default function EditProfilePage({ history }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [locationLoading, setLocationLoading] = useState(false);
  const [localProfileData, setLocalProfileData] = useState<ProfileData>({});
  const [localValidation, setLocalValidation] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const [detailAddress, setDetailAddress] = useState(localProfileData.location);

  const { data: userData, isLoading, isSuccess } = useQuery<
    UserData | undefined
  >("userProfile", () => getUser(), {
    retry: 2,
  });

  const { mutateAsync: mutateUserProfile, isLoading: isUpdating } = useMutation(
    editProfile
  );

  useEffect(() => {
    if (isSuccess) {
      setLocalProfileData({
        username: userData?.username,
        shortBio: userData?.shortBio,
        job: userData?.job,
        profileImageUrl: userData?.profileImageUrl,
        location: userData?.location,
        activities: userData?.activities,
        gender: userData?.gender,
        isYkClub: userData?.isYkClub,
        MBTI: userData?.MBTI,
        personality: userData?.personality,
        drinkingStyle: userData?.drinkingStyle,
      });
    }
  }, [isSuccess]);

  // 카카오 맵, 현재 위치
  const searchDetailAddressFromCoords = (
    coords: {
      latitude: number;
      longitude: number;
    },
    callback: (result: any, status: boolean) => void
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
                  newAddr[0] + " " + newAddr[1] + " " + newAddr[2]
                );
                setLocationLoading(false);
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

  useEffect(() => {
    currentLocationScript();
  }, []);

  const updateProfile = async () => {
    const trimedProfileData = Object.keys(localProfileData).reduce(
      (acc, curr) => {
        if (
          typeof localProfileData[curr] === "string" &&
          localProfileData[curr] !== "profileImageUrl"
        ) {
          acc[curr] = localProfileData[curr].trim();
        } else {
          acc[curr] = localProfileData[curr];
        }

        return acc;
      },
      {}
    );
    const editedProfileData: ProfileData = diff(userData, trimedProfileData);
    if (_.isEqual(editedProfileData, {}))
      return toast.info("프로필을 수정해주세요");
    const { data } = await mutateUserProfile({
      ...editedProfileData,
    });
    if (!data.ok) return alert(data.error);
    toast.success("프로필 편집 성공했습니다");
    history.push(routes.myPage);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0 || e.target.value.length >= 20) {
      setLocalValidation([
        false,
        localValidation[1],
        localValidation[2],
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        true,
        localValidation[1],
        localValidation[2],
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0 && e.target.value.length < 255) {
      setLocalValidation([
        localValidation[0],
        true,
        localValidation[2],
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        false,
        localValidation[2],
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      job: e.target.value,
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 0 && e.target.value.length < 1023) {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        true,
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        false,
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      shortBio: e.target.value,
    }));
  };

  const handlePersonalityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length > 0 && e.target.value.length < 255) {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        localValidation[2],
        true,
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        localValidation[2],
        false,
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      personality: e.target.value,
    }));
  };

  const handleIsYkChnage = () => {
    const newYk = !localProfileData.isYkClub;
    setLocalProfileData((prev) => ({
      ...prev,
      isYkClub: newYk,
    }));
  };

  const handleActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProfileData((prev) => ({
      ...prev,
      activities: e.target.value,
    }));
  };

  const handleMBTIChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalProfileData((prev) => ({
      ...prev,
      MBTI: e.target.value,
    }));
    console.log(e.target.value);
  };

  const handleDrinkingStyleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocalProfileData((prev) => ({
      ...prev,
      drinkingStyle: Number(e.target.value),
    }));
    console.log(e.target.value);
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
    console.log(__file);
    
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      setLocalProfileData((prev) => ({
        ...prev,
        profileImageUrl: e.target!.result as string,
      }));
    };
    setLocalProfileData((prev) => ({
      ...prev,
      profileImageFile: __file,
    }));
  };

  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "200자 이하의 계열이나 직업을 입력해주세요",
    "1000자 이하의 자기소개를 입력해주세요",
    "200자 이하의 성격이나 스타일을 입력해주세요",
  ];

  return (
    <ContainerFlexColumn>
      <PageTitle title="프로필 수정" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>프로필 수정하기</Heading>
          <CenteredContainer>
            <FileLabel htmlFor="input-file">
              <FlexDiv>
                <AvartarProfile
                  src={optimizeImage(
                    localProfileData.profileImageUrl ||
                      "/avatar/anonymous_user.png"
                  )}
                />
              </FlexDiv>
              <input
                id="input-file"
                type="file"
                onChange={handleFileOnChange}
                style={{ display: "none" }}
              />
              <FlexDiv
                style={{
                  marginTop: "11px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: colors.MidBlue,
                }}
              >
                <p style={{ color: colors.MidBlue }}>프로필사진 수정하러가기</p>
              </FlexDiv>
            </FileLabel>
          </CenteredContainer>
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
            {locationLoading ? (
              <ClipLoader
                color={colors.MidBlue}
                size={15}
                loading={locationLoading}
              />
            ) : (
              detailAddress || "대한민국 어딘가"
            )}
          </LocationText>
          <form>
            <MidInput
              name="name"
              placeholder="Username"
              value={localProfileData.username || ""}
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

            <Label>MBTI</Label>
            <SSelect
              id=""
              value={localProfileData.MBTI}
              name="MBTI"
              style={{ marginTop: "12px", color: colors.Black }}
              onChange={handleMBTIChange}
            >
              <option value="ISFP" style={{ color: colors.Black }}>
                ISFP (호기심 많은 예술가)
              </option>
              <option value="ISFJ" style={{ color: colors.Black }}>
                ISFJ (용감한 수호자)
              </option>
              <option value="ISTP" style={{ color: colors.Black }}>
                ISTP (만능재주꾼)
              </option>
              <option value="ISTJ" style={{ color: colors.Black }}>
                ISTJ (청렴결백 논리주의자)
              </option>
              <option value="INFP" style={{ color: colors.Black }}>
                INFP (열정적인 중재자)
              </option>
              <option value="INFJ" style={{ color: colors.Black }}>
                INFJ (선의의 옹호자)
              </option>
              <option value="INTP" style={{ color: colors.Black }}>
                INTP (논리적 사색가)
              </option>
              <option value="INTJ" style={{ color: colors.Black }}>
                INTJ (용의주도한 전략가)
              </option>
              <option value="ESFP" style={{ color: colors.Black }}>
                ESFP (자유영혼 연예인)
              </option>
              <option value="ESFJ" style={{ color: colors.Black }}>
                ESFJ (사교적인 외교관)
              </option>
              <option value="ESTP" style={{ color: colors.Black }}>
                ESTP (모험을 즐기는 사업가)
              </option>
              <option value="ESTJ" style={{ color: colors.Black }}>
                ESTJ (엄격한 관리자)
              </option>
              <option value="ENFP" style={{ color: colors.Black }}>
                ENFP (재기발랄한 활동가)
              </option>
              <option value="ENFJ" style={{ color: colors.Black }}>
                ENFJ (정의로운 사회운동가)
              </option>
              <option value="ENTP" style={{ color: colors.Black }}>
                ENTP (논쟁을 즐기는 변론가)
              </option>
              <option value="ENTJ" style={{ color: colors.Black }}>
                ENTJ (대담한 통솔가)
              </option>
              <option value="모름" style={{ color: colors.Black }}>
                모름
              </option>
            </SSelect>
            <Label>계열이나 직업</Label>
            <MidInput
              name="job"
              placeholder="ex. 새내기 / 스타트업 마케터 / AI중독 문과생..."
              value={localProfileData.job || ""}
              onChange={handleJobChange}
              style={
                localValidation[1]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
            />
            {!localValidation[1] && (
              <ErrorMessage>{errorMessages[1]}</ErrorMessage>
            )}

            <Label>간단한 자기소개</Label>
            <BigTextArea
              name="selfpromotext"
              placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
            요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
              value={localProfileData.shortBio || ""}
              onChange={handleBioChange}
              style={
                localValidation[2]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
            />
            {!localValidation[2] && (
              <ErrorMessage>{errorMessages[2]}</ErrorMessage>
            )}
            <Label>성격이나 스타일</Label>
            <SBigTextArea
              name="personality"
              value={localProfileData.personality || ""}
              placeholder="ex. 친해지면 말 많아요 / 드립력 상 / 조용하고 이야기 잘 들어줘요 / 연락, 답장이 빨라요"
              style={
                localValidation[3]
                  ? { borderColor: colors.BareGray }
                  : { borderColor: colors.MidBlue }
              }
              onChange={handlePersonalityChange}
            />
            {!localValidation[3] && (
              <ErrorMessage>{errorMessages[3]}</ErrorMessage>
            )}
            <Label>주량</Label>
            <SSelect
              id=""
              value={localProfileData.drinkingStyle}
              name="drinkingStyle"
              onChange={handleDrinkingStyleChange}
            >
              <option value="0" style={{ color: colors.BareGray }}>
                안 마셔요
              </option>
              <option value="1" style={{ color: colors.Black }}>
                가끔
              </option>
              <option value="2" style={{ color: colors.Black }}>
                술은 분위기상
              </option>
              <option value="3" style={{ color: colors.Black }}>
                메뉴가 좋으면 못 참지!
              </option>
              <option value="4" style={{ color: colors.Black }}>
                술은 동반자
              </option>
            </SSelect>
            <YkContainer>
              <Label>혹시 맛집 동아리 연고이팅 회원이신가요?</Label>
              <YkInnerContainer onClick={handleIsYkChnage}>
                {localProfileData?.isYkClub ? (
                  <YkChecked></YkChecked>
                ) : (
                  <Ykunchecked></Ykunchecked>
                )}

                <LabelSpan>예</LabelSpan>
              </YkInnerContainer>
            </YkContainer>
          </form>
          <SpaceForNavBar></SpaceForNavBar>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>

      <BottomFixedButtonContainer>
        <BottomFixedButtoninContainer
          disabled={
            diff(userData, localProfileData) === {} ||
            localValidation.includes(false)
          }
          onClick={updateProfile}
        >
          수정하기
        </BottomFixedButtoninContainer>
      </BottomFixedButtonContainer>
      {isLoading ||
        (isUpdating && (
          <>
            <LoaderBackdrop />
            <LoaderWrapper>
              <ClipLoader
                loading={isLoading || isUpdating}
                color={colors.MidBlue}
                css={{ name: "width", styles: "border-width: 4px;" }}
                size={30}
              />
            </LoaderWrapper>
          </>
        ))}
    </ContainerFlexColumn>
  );
}

const CenteredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const YkContainer = styled.div``;

const YkInnerContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Ykunchecked = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${colors.LightGray};
  margin-right: 5px;
`;

const YkChecked = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${colors.MidBlue};
  color: white;
  margin-right: 5px;
  border: 1px solid ${colors.MidBlue};
`;

const WarningText = styled.p`
  margin: 18px 0 22px;
  font-weight: normal;
  font-size: 10px;
  color: ${colors.MidGray};
  line-height: 15px;
  b {
    font-weight: 900;
  }
`;

const LocationText = styled.p`
  font-size: 14px;
  margin: 12px 0 10px;
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

const SBigTextArea = styled(BigTextArea)`
  font-size: 14px;
  line-height: 18px;
  height: 80px;
`;

const SSelect = styled.select`
  margin-top: 12px;
  color: ${colors.Black};
`;
