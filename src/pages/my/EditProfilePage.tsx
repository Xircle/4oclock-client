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
import { AgeNumberToString } from "../../lib/utils";
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
        gender: userData?.gender,
        isYkClub: userData?.isYkClub,
        MBTI: userData?.MBTI,
        personality: userData?.personality,
        drinkingStyle: userData?.drinkingStyle,
      });
    }
  }, [isSuccess]);

  // ????????? ???, ?????? ??????
  const searchDetailAddressFromCoords = (
    coords: {
      latitude: number;
      longitude: number;
    },
    callback: (result: any, status: boolean) => void
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    // ????????? ????????? ?????? ?????? ????????? ???????????????
    if (coords.longitude && coords.latitude)
      geocoder.coord2Address(coords.longitude, coords.latitude, callback);
  };

  // ????????? ??? ??? ??????
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
      return toast.info("???????????? ??????????????????");
    const { data } = await mutateUserProfile({
      ...editedProfileData,
    });
    if (!data.ok) return alert(data.error);
    toast.success("????????? ?????? ??????????????????");
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
        "?????? ?????? ????????? ??????????????????. ?????? ????????? ?????? 10MB?????????. "
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
    "20??? ????????? ????????? ??????????????????",
    "200??? ????????? ???????????? ????????? ??????????????????",
    "1000??? ????????? ??????????????? ??????????????????",
    "200??? ????????? ???????????? ???????????? ??????????????????",
  ];

  return (
    <ContainerFlexColumn>
      <PageTitle title="????????? ??????" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>????????? ????????????</Heading>
          <CenteredContainer>
            <FileLabel htmlFor="input-file">
              <FlexDiv>
                <AvartarProfile
                  src={optimizeImage(
                    localProfileData.profileImageUrl ||
                      "/avatar/anonymous_user.png",
                    { width: 125, height: 125 }
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
                <p style={{ color: colors.MidBlue }}>??????????????? ??????????????????</p>
              </FlexDiv>
            </FileLabel>
          </CenteredContainer>
          <WarningText>
            ????????? ??????, ?????? ????????? ???????????????. ????????? ????????? ??????{" "}
            <b>??????????????? {">"} ????????????</b>?????? ??????????????? ??????????????????!
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
              detailAddress || "???????????? ?????????"
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
                ISFP (????????? ?????? ?????????)
              </option>
              <option value="ISFJ" style={{ color: colors.Black }}>
                ISFJ (????????? ?????????)
              </option>
              <option value="ISTP" style={{ color: colors.Black }}>
                ISTP (???????????????)
              </option>
              <option value="ISTJ" style={{ color: colors.Black }}>
                ISTJ (???????????? ???????????????)
              </option>
              <option value="INFP" style={{ color: colors.Black }}>
                INFP (???????????? ?????????)
              </option>
              <option value="INFJ" style={{ color: colors.Black }}>
                INFJ (????????? ?????????)
              </option>
              <option value="INTP" style={{ color: colors.Black }}>
                INTP (????????? ?????????)
              </option>
              <option value="INTJ" style={{ color: colors.Black }}>
                INTJ (??????????????? ?????????)
              </option>
              <option value="ESFP" style={{ color: colors.Black }}>
                ESFP (???????????? ?????????)
              </option>
              <option value="ESFJ" style={{ color: colors.Black }}>
                ESFJ (???????????? ?????????)
              </option>
              <option value="ESTP" style={{ color: colors.Black }}>
                ESTP (????????? ????????? ?????????)
              </option>
              <option value="ESTJ" style={{ color: colors.Black }}>
                ESTJ (????????? ?????????)
              </option>
              <option value="ENFP" style={{ color: colors.Black }}>
                ENFP (??????????????? ?????????)
              </option>
              <option value="ENFJ" style={{ color: colors.Black }}>
                ENFJ (???????????? ???????????????)
              </option>
              <option value="ENTP" style={{ color: colors.Black }}>
                ENTP (????????? ????????? ?????????)
              </option>
              <option value="ENTJ" style={{ color: colors.Black }}>
                ENTJ (????????? ?????????)
              </option>
              <option value="??????" style={{ color: colors.Black }}>
                ??????
              </option>
            </SSelect>
            <Label>???????????? ??????</Label>
            <MidInput
              name="job"
              placeholder="ex. ????????? / ???????????? ????????? / AI?????? ?????????..."
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

            <Label>????????? ????????????</Label>
            <BigTextArea
              name="selfpromotext"
              placeholder="ex. ????????? ????????? ????????? ?????? ?????? ???????????? ???????????????^^
            ?????? ??????????????? ????????? ????????? ???????????? ????????? ??????????????? ?????? ??? ???????????????"
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
            <Label>???????????? ?????????</Label>
            <SBigTextArea
              name="personality"
              value={localProfileData.personality || ""}
              placeholder="ex. ???????????? ??? ????????? / ????????? ??? / ???????????? ????????? ??? ???????????? / ??????, ????????? ?????????"
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
            <Label>??????</Label>
            <SSelect
              id=""
              value={localProfileData.drinkingStyle}
              name="drinkingStyle"
              onChange={handleDrinkingStyleChange}
            >
              <option value="0" style={{ color: colors.BareGray }}>
                ??? ?????????
              </option>
              <option value="1" style={{ color: colors.Black }}>
                ??????
              </option>
              <option value="2" style={{ color: colors.Black }}>
                ?????? ????????????
              </option>
              <option value="3" style={{ color: colors.Black }}>
                ????????? ????????? ??? ??????!
              </option>
              <option value="4" style={{ color: colors.Black }}>
                ?????? ?????????
              </option>
            </SSelect>
            <YkContainer>
              <Label>?????? ?????? ????????? ???????????? ???????????????????</Label>
              <YkInnerContainer onClick={handleIsYkChnage}>
                {localProfileData?.isYkClub ? (
                  <YkChecked></YkChecked>
                ) : (
                  <Ykunchecked></Ykunchecked>
                )}

                <LabelSpan>???</LabelSpan>
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
          ????????????
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
