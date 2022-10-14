import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamApplications } from "../../../lib/api/getTeamApplications";
import { GetTeamApplications } from "../../../lib/api/types";
import { colors } from "../../../styles/styles";

interface Props extends RouteComponentProps<{ teamId: string }, {}, {}> {}

export default function V2LeaderApprovePage({ match }: Props) {
  const { teamId } = match.params;
  const { data: teamApplicationsData } = useQuery<
    GetTeamApplications | undefined
  >(["TeamApplications", teamId], () => getTeamApplications(teamId), {
    onError: (err: any) => {
      alert(err);
      return;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (teamApplicationsData) console.log(teamApplicationsData);
  }, [teamApplicationsData]);

  return (
    <Container>
      <V2SubHeaderC title="리더 승인 page" />
      <InfoContainer>
        <InstructionContainer>
          *my 클럽에 신청한 친구들이에요! 꼭 <b>3일안에 승인</b>을 해주세요!
        </InstructionContainer>
        <FontAwesomeIcon icon={faUsers} color={colors.Lime} />
      </InfoContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const InstructionContainer = styled.div`
  margin-top: 11px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 9px;
  text-align: center;
  background-color: #dbedff;
  font-weight: 500;
  font-size: 12px;
  color: #8c94a4;
  b {
    color: #fd8a66;
  }
`;
