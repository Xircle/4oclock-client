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
import { AgeNumberToString } from "../../lib/utils";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import diff from "object-diff";
import _ from "lodash";
import { editProfile } from "../../lib/api/editProfile";
import { toast } from "react-toastify";
import routes from "../../routes";
import { RouteComponentProps } from "react-router-dom";

export interface ProfileData {
  username?: string;
  shortBio?: string;
  profileImageFile?: File;
  profileImageUrl?: string;
  job?: string;
  location?: string;
  activities?: string;
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
  ]);
  const [detailAddress, setDetailAddress] = useState(localProfileData.location);

  const {
    data: userData,
    isLoading,
    isSuccess,
  } = useQuery<UserData | undefined>("userProfile", () => getUser(), {
    retry: 2,
  });

  const { mutateAsync: mutateUserProfile, isLoading: isUpdating } =
    useMutation(editProfile);

  useEffect(() => {
    if (isSuccess) {
      setLocalProfileData({
        username: userData?.username,
        shortBio: userData?.shortBio,
        job: userData?.job,
        profileImageUrl: userData?.profileImageUrl,
        location: userData?.location,
        activities: userData?.activities,
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
      setLocalValidation([false, localValidation[1], localValidation[2]]);
    } else {
      setLocalValidation([true, localValidation[1], localValidation[2]]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1) {
      setLocalValidation([localValidation[0], false, localValidation[2]]);
    } else {
      setLocalValidation([localValidation[0], true, localValidation[2]]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      shortBio: e.target.value,
    }));
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0 || e.target.value.length > 8) {
      setLocalValidation([localValidation[0], localValidation[1], false]);
    } else {
      setLocalValidation([localValidation[0], localValidation[1], true]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      job: e.target.value,
    }));
  };

  const handleActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProfileData((prev) => ({
      ...prev,
      activities: e.target.value,
    }));
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
    "1자 이상의 자기소개를 입력해주세요",
    "1자에서 8자 이내로 입력해주세요",
  ];

  return (
    <ContainerFlexColumn>
      <PageTitle title="프로필 수정" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>프로필 수정하기</Heading>
          <FileLabel htmlFor="input-file">
            <FlexDiv>
              <AvartarProfile
                src={
                  localProfileData.profileImageUrl ||
                  "/avatar/anonymous_user.png"
                }
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
            <FlexDiv
              style={{
                justifyContent: "normal",
                marginTop: "12px",
              }}
            >
              <SmallInput
                name="university"
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
              value={localProfileData.shortBio || ""}
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
            <Label>개성있는 한줄소개</Label>
            <MidInput
              name="job"
              placeholder="ex. 공대생 / 미개봉 새내기 / 디자이너"
              value={localProfileData.job || ""}
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
            <Label>활동이력</Label>
            <MidInput
              name="activities"
              placeholder="ex. 식탁팟/인사이더스/멋쟁이사자처럼"
              value={localProfileData.activities || ""}
              onChange={handleActivitiesChange}
            />
          </form>
          <SpaceForNavBar></SpaceForNavBar>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>

      <BottomFixedButtonContainer>
        <BottomFixedButtoninContainer
          disabled={diff(userData, localProfileData) === {}}
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
