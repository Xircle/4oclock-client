import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { getTeamById } from "../../../lib/api/getTeamById";
import { TeamData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
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

  return (
    <Container>
      <SHeader>
        <SHeaderPic
          src={optimizeImage(teamData?.images?.[0] || "hi", {
            width: 375,
            height: 230,
          })}
          alt={teamData && teamData?.name + "사진"}
        />
      </SHeader>
    </Container>
  );
}

const Container = styled.div``;

const SHeader = styled.div`
  height: 160px;
  position: relative;
`;

const SHeaderPic = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;
