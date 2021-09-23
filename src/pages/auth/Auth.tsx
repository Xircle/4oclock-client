import { useState, Fragment, useReducer, useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import AuthPhoneNumber from "../../components/auth/AuthPhoneNumber";
import AuthProfileData from "../../components/auth/AuthProfileData";
import AuthProfileImage from "../../components/auth//AuthProfileImage";
import AuthAgree from "../../components/auth/AuthAgree";
import { colors, ContainerFlexColumn } from "../../styles";
import BackButtonWithNoBackground from "../../components/shared/BackButtonWithNoBackground";
import { SocialAuthResponse } from "../../lib/kakao";
import { CreateAccountOutput } from "../../lib/api/types";
import routes from "../../routes";
import { toast } from "react-toastify";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import PageTitle from "../../components/PageTitle";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import { initialState, reducer } from "./AuthReducer";
import { createAccount } from "../../lib/api/createAccount";

function Auth() {
  const history = useHistory();
  const location = useLocation<SocialAuthResponse>();
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
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
        const data: CreateAccountOutput = await createAccount(state);
        if (!data.ok) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push(routes.root);
        } else {
          storage.setItem(CURRENT_USER, data.data!);
          window.location.href = `${routes.placeFeed}?isSignup=true`;
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

  if (isLoading)
    return (
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
    );

  return (
    <ContainerFlexColumn>
      <PageTitle title="프로필 등록" />
      <BackButtonWithNoBackground onPrev={prevStep} />
      {components.map((component, index) => {
        if (index === step) return <Fragment key={index}>{component}</Fragment>;
        return null;
      })}
    </ContainerFlexColumn>
  );
}
export default withRouter(Auth);
