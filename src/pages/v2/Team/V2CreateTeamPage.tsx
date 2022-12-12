import React, { useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { teamInitialState, teamReducer } from "./TeamReducer";

interface Props {
  leaderId: string;
}

export default function V2CreateTeamPage({ leaderId }: Props) {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(teamReducer, teamInitialState);
  const [isLoading, setIsLoading] = useState(false);

  return <Container>create team page</Container>;
}

const Container = styled.div`
  width: 100%;
`;
