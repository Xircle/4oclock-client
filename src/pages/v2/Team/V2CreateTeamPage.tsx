import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import PageTitle from "../../../components/PageTitle";
import BackButtonWithNoBackground from "../../../components/shared/BackButtonWithNoBackground";
import { CURRENT_USER } from "../../../components/shared/constants";
import {
  LoaderBackdrop,
  LoaderWrapper,
} from "../../../components/shared/Loader";
import CreateTeam1 from "../../../components/team/CreateTeam1";
import CreateTeam2 from "../../../components/team/CreateTeam2";
import CreateTeam3 from "../../../components/team/CreateTeam3";
import CreateTeamEnd from "../../../components/team/CreateTeamEnd";
import storage from "../../../lib/storage";
import routes from "../../../routes";
import { colors, ContainerFlexColumn } from "../../../styles/styles";
import { teamInitialState, teamReducer } from "./TeamReducer";

interface Props {
  leaderId: string;
}

export default function V2CreateTeamPage({ leaderId }: Props) {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(teamReducer, teamInitialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {};

  const prevStep = () => {
    if (step > 0) setStep((step) => step - 1);
    else history.goBack();
  };

  useEffect(() => {
    const leaderId = storage.getItem(CURRENT_USER)?.uid;
    if (leaderId) {
      dispatch({ type: "setLeaderId", payload: leaderId });
    } else {
      history.push(routes.v2Root);
    }
  }, []);

  const components = [
    <CreateTeam1 onNext={handleNext} state={state} dispatch={dispatch} />,
    <CreateTeam2 onNext={handleNext} state={state} dispatch={dispatch} />,
    <CreateTeam3 onNext={handleNext} state={state} dispatch={dispatch} />,
    <CreateTeamEnd />,
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
