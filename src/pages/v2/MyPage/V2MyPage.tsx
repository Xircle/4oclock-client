import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import MyApplicationRow from "../../../components/V2/Application/MyApplicationRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import V2SmallProfile from "../../../components/V2/UI/V2SmallProfile";
import { getMyApplications } from "../../../lib/api/getMyApplications";
import { GetMyApplicationsOutput, MyApplication } from "../../../lib/api/types";
import { Container } from "../../../styles/styles";

export default function V2MyPage() {
  const [approveds, setApproveds] = useState<MyApplication[] | undefined>([]);
  const [disapproveds, setDisapproveds] = useState<MyApplication[] | undefined>(
    [],
  );
  const [pendings, setPendings] = useState<MyApplication[] | undefined>([]);
  const [enrolleds, setEnrolleds] = useState<MyApplication[] | undefined>([]);

  const { data: applicationOutput, refetch } =
    useQuery<GetMyApplicationsOutput>(
      ["Applications"],
      () => getMyApplications(),
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
    if (applicationOutput?.applications) {
      console.log(applicationOutput);
      setApproveds(applicationOutput.applications.approveds);
      setDisapproveds(applicationOutput.applications.disapproveds);
      setPendings(applicationOutput.applications.pendings);
      setEnrolleds(applicationOutput.applications.enrolleds);
    }
  }, [applicationOutput]);

  return (
    <Container>
      <V2HeaderC title="my page" />
      <Body>
        <BodyItem>
          <BodyItemHeading>승인 대기중</BodyItemHeading>
          {pendings?.map((pending) => {
            return (
              <MyApplicationRow
                key={pending.id}
                id={pending.id}
                teamImage={pending.teamImage}
                status={pending.status}
                teamId={pending.teamId}
                paid={pending.paid}
                teamName={pending.teamName}
                refetch={refetch}
              />
            );
          })}
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>승인된 모임</BodyItemHeading>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
          <V2SmallProfile />
        </BodyItem>
      </Body>
    </Container>
  );
}

const Body = styled.div`
  margin-top: 10px;
`;

const BodyItem = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-bottom: 20px;
  min-height: 100px;
`;

const BodyScroll = styled.div`
  width: 100%;
  height: 150px;
  overflow-y: scroll;
`;

const BodyItemHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
