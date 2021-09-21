import { useState, Fragment, useReducer, useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import AuthPhoneNumber from "../../components/auth/AuthPhoneNumber";
import AuthProfileData from "../../components/auth/AuthProfileData";
import AuthProfileImage from "../../components/auth//AuthProfileImage";
import AuthAgree from "../../components/auth/AuthAgree";
import { colors, ContainerFlexColumn } from "../../styles";
import BackButtonWithNoBackground from "../../components/shared/BackButtonWithNoBackground";
import { AuthState, AuthAction } from "../../components/auth/types";
import { SocialAuthResponse } from "../../lib/kakao";
import AxiosClient from "../../lib/apiClient";
import { CreateAccountOutput } from "../../lib/api/types";
import routes from "../../routes";
import { toast } from "react-toastify";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import PageTitle from "../../components/PageTitle";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "setUid":
      return {
        ...state,
        uid: action.payload,
      };
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPhoneNumber":
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case "setAge":
      return {
        ...state,
        age: action.payload,
      };
    case "setGender":
      return {
        ...state,
        gender: action.payload,
      };
    case "setName":
      return {
        ...state,
        name: action.payload,
      };
    case "setUniversity":
      return {
        ...state,
        university: action.payload,
      };
    case "setTitle":
      return {
        ...state,
        title: action.payload,
      };
    case "setBio":
      return {
        ...state,
        bio: action.payload,
      };
    case "setLocation":
      return {
        ...state,
        location: action.payload,
      };
    case "setProfileImgUrl":
      return {
        ...state,
        profileImgUrl: action.payload,
      };
    case "setProfileImgFile":
      return {
        ...state,
        profileImgFile: action.payload,
      };
    case "setAgree1":
      if (action.payload === true) {
        return {
          ...state,
          agree1: action.payload,
        };
      } else {
        return {
          ...state,
          agree1: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree2":
      if (action.payload === true) {
        return {
          ...state,
          agree2: action.payload,
        };
      } else {
        return {
          ...state,
          agree2: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree3":
      if (action.payload === true) {
        return {
          ...state,
          agree3: action.payload,
        };
      } else {
        return {
          ...state,
          agree3: action.payload,
          agreeAll: false,
        };
      }
    case "setAgree4":
      if (action.payload === true) {
        return {
          ...state,
          agree4: action.payload,
        };
      } else {
        return {
          ...state,
          agree4: action.payload,
          agreeAll: false,
        };
      }

    case "setAgreeAll":
      return {
        ...state,
        agreeAll: action.payload,
        agree1: action.payload,
        agree2: action.payload,
        agree3: action.payload,
        agree4: action.payload,
      };
    case "setStage1Valid":
      return {
        ...state,
        stage1Valid: action.payload,
      };
    case "setStage2Valid":
      return {
        ...state,
        stage2Valid: action.payload,
      };
    case "setIsGraduate":
      return {
        ...state,
        isGraduate: action.payload,
      };
    default:
      throw new Error();
  }
}

function Auth() {
  const [step, setStep] = useState(0);
  const history = useHistory();
  const location = useLocation<SocialAuthResponse>();
  const [state, dispatch] = useReducer(reducer, {
    uid: 0,
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
    name: "",
    university: "",
    title: "",
    bio: "",
    location: "",
    profileImgUrl: "",
    profileImgFile: undefined,
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
    agreeAll: false,
    stage1Valid: false,
    stage2Valid: false,
    isGraduate: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const uid = location.state?.uid;
    const thumbnail = location.state?.thumbnail;
    const username = location.state?.username;
    const email = location.state?.email;
    const gender = location.state?.gender;

    if (localStorage.getItem("CURRENT_USER")) {
      window.location.href = routes.placeFeed;
      return;
    }
    if (uid) dispatch({ type: "setUid", payload: uid });
    if (username) dispatch({ type: "setName", payload: username });
    if (gender) dispatch({ type: "setGender", payload: gender });
    if (thumbnail) dispatch({ type: "setProfileImgUrl", payload: thumbnail });
    if (email) dispatch({ type: "setEmail", payload: email });
  }, []);

  const handleNext = async () => {
    if (step < components.length - 1) {
      setStep((step) => step + 1);
    } else {
      setIsLoading(true);
      try {
        const formData = new FormData();
        console.log("image file : ", state.profileImgFile);
        console.log("image url : ", state.profileImgUrl);
        if (state.profileImgFile) {
          formData.append("profileImageFile", state.profileImgFile!);
        } else {
          formData.append("profileImageUrl", state.profileImgUrl!);
        }
        formData.append("socialId", state.uid + "");
        formData.append("email", state.email);
        formData.append("phoneNumber", state.phoneNumber);
        formData.append("username", state.name);
        formData.append("university", state.university);
        formData.append("isGraduate", state.isGraduate + "");
        formData.append("age", state.age);
        formData.append("gender", state.gender);
        formData.append("job", state.title);
        formData.append("shortBio", state.bio);
        formData.append("location", state.location + "");
        formData.append("isMarketingAgree", state.agree4 + "");

        const { data } = await AxiosClient.post<CreateAccountOutput>(
          "auth/social/register/kakao",
          formData
        );
        if (!data.ok) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push(routes.root);
        } else {
          storage.setItem(CURRENT_USER, data.data!);
          toast.success("가입이 완료되었습니다!", {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push(routes.placeFeed);
        }
      } catch (err) {
        console.log(err);
        throw new Error();
      } finally {
        setIsLoading(false);
      }
      return () => {
        setIsLoading(false);
      };
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((step) => step - 1);
    else history.push(routes.root);
  };

  const components = [
    <AuthPhoneNumber onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthProfileData onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthProfileImage onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthAgree onNext={handleNext} state={state} dispatch={dispatch} />,
  ];

  return (
    <ContainerFlexColumn>
      <PageTitle title="프로필 등록" />
      <BackButtonWithNoBackground onPrev={prevStep} />
      {components.map((component, index) => {
        if (index === step) return <Fragment key={index}>{component}</Fragment>;
        return null;
      })}
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
    </ContainerFlexColumn>
  );
}
export default withRouter(Auth);
