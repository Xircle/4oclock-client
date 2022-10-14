import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getApplicationByLeader } from "../../../lib/api/getApplicationByLeader";
import { GetApplicationByLeaderData } from "../../../lib/api/types";

interface Props
  extends RouteComponentProps<{ applicationId: string }, {}, {}> {}

export default function V2LeaderApproveDetailPage({ match }: Props) {
  const { applicationId } = match.params;
  const { data, refetch } = useQuery<GetApplicationByLeaderData | undefined>(
    ["TeamApplications", applicationId],
    () => getApplicationByLeader(applicationId),
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
    if (data) console.log(data);
  }, [data]);

  return (
    <Container>
      <V2SubHeaderC title="신청서 및 정보" />
    </Container>
  );
}

const Container = styled.div``;
