import styled from "styled-components";
import { useState, Fragment, useReducer } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import AuthPage1 from "./AuthPage1";
import AuthPage2 from "./AuthPage2";
import AuthPage3 from "./AuthPage3";
import AuthPage4 from "./AuthPage4";
import { ContainerFlexColumn } from "../../styles";
import BackButtonWithNoBackground from "../../components/shared/BackButtonWithNoBackground";
import { AuthState, AuthAction } from "./types";
import routes from "../../routes";

interface Props {}

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
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
    default:
      throw new Error();
  }
}

function AuthPage(props: Props) {
  const [step, setStep] = useState(0);
  const history = useHistory();
  const location = useLocation<AuthState>();
  const [state, dispatch] = useReducer(reducer, {
    phoneNumber: "",
    age: "",
    gender: "",
    name: "",
    university: "",
    title: "",
    bio: "",
    location: "",
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
    agreeAll: false,
    stage1Valid: false,
    stage2Valid: false,
  });

  const handleNext = () => {
    if (step < components.length) {
      setStep((step) => step + 1);
    } else {
      // need to be updated
      history.push(routes.places);
    }
  };
  const prevStep = () => {
    if (step > 0) setStep((step) => step - 1);
    else history.push("/");
  };

  const components = [
    <AuthPage1 onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthPage2 onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthPage3 onNext={handleNext} state={state} dispatch={dispatch} />,
    <AuthPage4 onNext={handleNext} state={state} dispatch={dispatch} />,
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
export default withRouter(AuthPage);
