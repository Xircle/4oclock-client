import styled from "styled-components";
import { useState, Fragment, useReducer, useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import AuthPhoneNumber from "./AuthPhoneNumber";
import AuthProfileData from "./AuthProfileData";
import AuthProfileImage from "./AuthProfileImage";
import AuthAgree from "./AuthAgree";
import { ContainerFlexColumn } from "../../styles";
import BackButtonWithNoBackground from "../../components/shared/BackButtonWithNoBackground";
import { AuthState, AuthAction } from "./types";
import routes from "../../routes";
import { SocialAuthResponse } from "../../lib/kakao";
import { useQuery, useMutation } from "react-query";
import { createAccount } from "../../lib/api/createAccount";
import AxiosClient from "../../lib/apiClient";
import { CreateAccountOutput } from "../../lib/api/types";

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
      window.location.href =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/places"
          : process.env.REACT_APP_HOST + "/places";
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
      console.log("axios");
      setIsLoading(true);
      // need to be updated
      const formData = new FormData();
      console.log("image file : ", state.profileImgFile);
      formData.append("profileImageFile", state.profileImgFile!);
      // if (state.profileImgUrl) {
      //   formData.append("profileImageUrl", state.profileImgUrl);
      // } else {
      // }
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
      console.log(data);
      if (data.ok) {
        history.push("/places");
      } else {
        alert(data.error);
      }
      return () => {
        setIsLoading(false);
      };
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((step) => step - 1);
    else history.push("/");
  };

  const components = [
    <AuthPhoneNumber onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthProfileData onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthProfileImage onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthAgree onNext={handleNext} state={state} dispatch={dispatch} />,
  ];

  return (
    <ContainerFlexColumn>
      <BackButtonWithNoBackground onPrev={prevStep} />
      {components.map((component, index) => {
        if (index === step) return <Fragment key={index}>{component}</Fragment>;
        return null;
      })}
    </ContainerFlexColumn>
  );
}
export default withRouter(Auth);