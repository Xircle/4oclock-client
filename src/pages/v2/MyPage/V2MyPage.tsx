import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import MyApplicationRow from "../../../components/V2/Application/MyApplicationRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import V2SmallProfile from "../../../components/V2/UI/V2SmallProfile";
import { getMyApplications } from "../../../lib/api/getMyApplications";
import { GetMyApplicationsOutput, MyApplication } from "../../../lib/api/types";
import { InquiryCTA } from "../../../lib/v2/utils";
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
        <InquiryButton onClick={InquiryCTA}>케빈에게 문의하기</InquiryButton>
        {pendings && pendings?.length > 0 && (
          <BodyItem>
            <BodyItemHeading>승인 대기중</BodyItemHeading>
            <PendingAlertText>
              *신청취소는 1번밖에 안되니 유의해줘!
            </PendingAlertText>
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
        )}

        <BodyItem>
          <BodyItemHeading>승인된 모임🎉</BodyItemHeading>
          {approveds?.map((approved) => {
            return (
              <MyApplicationRow
                key={approved.id}
                id={approved.id}
                teamImage={approved.teamImage}
                status={approved.status}
                teamId={approved.teamId}
                paid={approved.paid}
                teamName={approved.teamName}
                refetch={refetch}
                leaderData={applicationOutput?.leaderData}
              />
            );
          })}

          {approveds && approveds.length > 0 ? (
            <>
              <InstructionHeading>
                📌만약 단톡에 초대가 안된다면?
              </InstructionHeading>
              <InstructionSubHeading>
                리더 전화번호 복사 {">"} 리더에게 문의해봐!
              </InstructionSubHeading>
            </>
          ) : (
            <NoTeamText>
              아직 승인된 모임이
              <br />
              없습니다
            </NoTeamText>
          )}
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
          <V2SmallProfile />
        </BodyItem>
      </Body>
    </Container>
  );
}

const PendingAlertText = styled.div`
  color: #505050;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 15px;
`;

const InstructionSubHeading = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-top: 17px;
  /* identical to box height, or 136% */

  color: #505050;
`;

const InstructionHeading = styled.div`
  margin-top: 26px;
  color: #505050;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const InquiryButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  background: rgba(33, 225, 156, 0.33);
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 157px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 18px;
  color: #505050;
  cursor: pointer;
`;

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

const NoTeamText = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  /* or 146% */

  text-align: center;

  color: #8c94a4;
`;
