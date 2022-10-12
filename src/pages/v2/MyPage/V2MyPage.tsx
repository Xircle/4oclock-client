import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import MyApplicationRow from "../../../components/V2/Application/MyApplicationRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
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

  const { data: applicationOutput } = useQuery<GetMyApplicationsOutput>(
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
          <BodyScroll>
            {pendings?.map((pending) => {
              return (
                <MyApplicationRow
                  id={pending.id}
                  teamImage={pending.teamImage}
                  status={pending.status}
                  teamId={pending.teamId}
                  paid={pending.paid}
                />
              );
            })}
          </BodyScroll>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>승인된 모임</BodyItemHeading>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
        </BodyItem>
      </Body>
    </Container>
  );
}

const Body = styled.div``;

const BodyItem = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-bottom: 20px;
  min-height: 100px;
`;

const BodyScroll = styled.div`
  width: 100%;
  height: 230px;
  overflow: scroll;
`;

const BodyItemHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
