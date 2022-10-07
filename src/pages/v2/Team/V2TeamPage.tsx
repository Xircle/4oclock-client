import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { getTeamById } from "../../../lib/api/getTeamById";
import { TeamData } from "../../../lib/api/types";
interface MatchParms {
  teamId: string;
}
interface LocationState {}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {}

export default function V2TeamPage({ match, location }: Props) {
  const { teamId } = match.params;
  const { data: teamData } = useQuery<TeamData | undefined>(
    ["team", teamId],
    () => getTeamById(teamId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  return <Container>{teamData?.name}</Container>;
}

const Container = styled.div``;
