import { Drawer } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import MyApplicationRow from "../../../components/V2/Application/MyApplicationRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import V2SmallProfile from "../../../components/V2/UI/V2SmallProfile";
import { editApplication } from "../../../lib/api/editApplication";
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
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelApplicationId, setCancelApplicationId] = useState("");

  const { mutateAsync: mutateEditApplication, isLoading: isFetching } =
    useMutation(editApplication);

  const { data: applicationOutput, refetch } =
    useQuery<GetMyApplicationsOutput>(
      ["Applications"],
      () => getMyApplications(),
      {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    );

  const requestCancelApprovedCTA = async () => {
    const { data } = await mutateEditApplication({
      applicationId: cancelApplicationId,
      isCancelRequested: "true",
    });
    if (data.ok) {
      await refetch();
      alert("승인 취소 신청되었습니다");
    } else {
      alert("승인 취소 신청에 실패하였습니다");
    }
  };

  useEffect(() => {
    if (applicationOutput?.applications) {
      console.log(applicationOutput);
      setApproveds(applicationOutput.applications.approveds);
      setDisapproveds(applicationOutput.applications.disapproveds);
      setPendings(applicationOutput.applications.pendings);
      setEnrolleds(applicationOutput.applications.enrolleds);
    }
  }, [applicationOutput]);
  const closeDrawer = () => {
    setDrawerOpened(false);
  };

  const openDrawer = () => {
    setDrawerOpened(true);
  };

  const cancelCTA = (applicationId: string) => {
    setCancelApplicationId(applicationId);
    openDrawer();
  };

  return (
    <Container>
      <Drawer
        PaperProps={{
          style: {
            width: 375,
            minHeight: 500,
            justifyContent: "flex-start",
            padding: 20,
            color: "#505050",
            fontWeight: "bold",
            fontSize: 19,
          },
        }}
        ModalProps={{
          style: {},
        }}
        SlideProps={{
          style: {
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
        open={drawerOpened}
        onClose={closeDrawer}
        anchor="bottom"
      >
        <CancelHeading>클럽 취소하기</CancelHeading>
        <CancelInfo>
          📌취소인정사유: 요일 변경 문제 / 친구와 같이 신청 문제만 인정 이외의
          단순변심으로 인한 취소는 불가능
          <br />
          📌취소진행순서: 리더에게 취소사유를 보내면 리더가 취소승인을 해줘야
          취소가 돼요{":)"}
          <br />
          📌취소사유를 보낸 후 리더에게 문자로 취소 요청 연락을 꼭꼭 해주세요
          <br />
          <strong>
            ※신청취소는 1번 밖에 안되니 신중히 클럽을 신청해주세요
          </strong>
        </CancelInfo>
        {cancelApplicationId}
      </Drawer>
      <V2HeaderC title="my page" />
      <Body>
        <InquiryButton onClick={InquiryCTA}>케빈에게 문의하기</InquiryButton>

        <BlueInfoText>
          신청한 클럽 중 가장 먼저 리더의 승인이 확인 된 클럽이 자신의
          정기club이야 !
        </BlueInfoText>
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
                isCancelRequested={approved.isCancelRequested}
                cancelCTA={cancelCTA}
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

const CancelInfo = styled.div`
  width: 100%;
  background: #dbedff;
  border-radius: 10px;
  padding: 8px 15px;
  margin-top: 18px;
  font-size: 12px;
  line-height: 20px;
  color: #505050;
  strong {
    color: #ff0000;
  }
`;

const CancelHeading = styled.div`
  color: #12121d;
  font-weight: 500;
  font-size: 17px;
`;

const BlueInfoText = styled.div`
  padding: 16px 26px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #505050;
  background: #dbedff;
  width: 90%;
  margin-bottom: 16px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
`;

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
