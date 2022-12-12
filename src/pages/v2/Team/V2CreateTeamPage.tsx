import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import styled from "styled-components";
import PageTitle from "../../../components/PageTitle";
import BackButtonWithNoBackground from "../../../components/shared/BackButtonWithNoBackground";
import { CURRENT_USER } from "../../../components/shared/constants";
import {
  LoaderBackdrop,
  LoaderWrapper,
} from "../../../components/shared/Loader";
import { CoreOutput } from "../../../components/shared/types";
import CreateTeam1 from "../../../components/team/CreateTeam1";
import CreateTeam2 from "../../../components/team/CreateTeam2";
import CreateTeam3 from "../../../components/team/CreateTeam3";
import CreateTeamEnd from "../../../components/team/CreateTeamEnd";
import storage from "../../../lib/storage";
import { createTeam } from "../../../lib/v2/createTeam";
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

  const handleNext = async () => {
    if (step < components.length - 1) {
      setStep((step) => step + 1);
    } else {
      setIsLoading(true);
      try {
        const data: CoreOutput = await createTeam(state);
        if (!data.ok) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        history.push(routes.v2LeaderPage);
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
    else history.goBack();
  };

  const showExample = () => {};

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
      <PageTitle title="팀 생성" />
      <Header>
        <FontAwesomeIcon
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "10px",
            fontSize: "22px",
          }}
          icon={faArrowLeft}
          color={colors.Black}
          size="2x"
          onClick={prevStep}
        />
        <HeaderTitle>리더 정기클럽 생성하기</HeaderTitle>
      </Header>
      <Body>
        <TopInfoContainer>
          <TopInfoLeft>
            정기클럽 기본정보({step + 1}/{components.length - 1})
          </TopInfoLeft>
          <TopInfoRight onClick={showExample}>생성예시보기</TopInfoRight>
        </TopInfoContainer>
        {components.map((component, index) => {
          if (index === step)
            return <Fragment key={index}>{component}</Fragment>;
          return null;
        })}
      </Body>

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

const TopInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopInfoLeft = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 35px;
  color: #505050;
`;

const TopInfoRight = styled.div`
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  line-height: 35px;
  color: #6f7789;
  padding: 3px 15px;
  background: rgba(33, 225, 156, 0.31);
  border-radius: 5px;
`;

const Body = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;

const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  color: #222222;
  padding: 10px;
`;
