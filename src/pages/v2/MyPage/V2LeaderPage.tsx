import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { getMyTeamsLeader } from "../../../lib/api/getMyTeamsLeader";
import { MyTeamsLeader } from "../../../lib/api/types";

export default function V2LeaderPage() {
  const { data: teamData } = useQuery<MyTeamsLeader[] | undefined>(
    ["leaderTeam"],
    () => getMyTeamsLeader(),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (teamData) {
      console.log(teamData);
    }
  }, [teamData]);

  return (
    <Container>
      <V2HeaderC title="리더 page" />
      <Body>
        <BodyItem>
          <BodyItemHeading>my 클럽</BodyItemHeading>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
        </BodyItem>
      </Body>
    </Container>
  );
}

const Container = styled.div``;

const Body = styled.div``;

const BodyItem = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-bottom: 20px;
  min-height: 100px;
`;

const BodyItemHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
