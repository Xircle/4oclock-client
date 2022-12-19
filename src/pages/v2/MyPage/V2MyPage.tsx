import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Modal from "../../../components/UI/Modal";
import MyApplicationRow from "../../../components/V2/Application/MyApplicationRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import V2SmallProfile from "../../../components/V2/UI/V2SmallProfile";
import { editApplication } from "../../../lib/api/editApplication";
import { getMyApplications } from "../../../lib/api/getMyApplications";
import { GetMyApplicationsOutput, MyApplication } from "../../../lib/api/types";
import { InquiryCTA } from "../../../lib/v2/utils";
import {
  BigTextArea,
  Container,
  colors,
  MainBtn,
} from "../../../styles/styles";

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
  const [cancelCheck, setCancelCheck] = useState(false);
  const [cancelSuccessModal, setCancelSuccessModal] = useState<boolean>(false);

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
    if (cancelReason.length < 30 || !cancelCheck) return;
    const { data } = await mutateEditApplication({
      applicationId: cancelApplicationId,
      isCancelRequested: "true",
      cancelReason: cancelReason,
    });
    if (data.ok) {
      await refetch();
      alert("승인 취소 신청되었습니다");
      setCancelSuccessModal(true);
      closeDrawer();
    } else {
      alert("승인 취소 신청에 실패하였습니다");
    }
  };

  useEffect(() => {
    if (applicationOutput?.applications) {
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
      {cancelSuccessModal && (
        <Modal
          isClose={!cancelSuccessModal}
          onClose={() => setCancelSuccessModal((prev) => !prev)}
        >
          <ModalWrapper>
            <h1>크롬 or 사파리로 접속해주세요!</h1>
            <p>
              삼성 브라우저에서 회원가입이 잘되지 않는 이슈를 발견했어요!
              <br />
              <br />
              원활한 접속을 위해 크롬 or 사파리로 접속해주세요
            </p>
            <MainBtn
              onClick={() => setCancelSuccessModal(false)}
              style={{ width: "90%" }}
            >
              확인했습니다
            </MainBtn>
          </ModalWrapper>
        </Modal>
      )}
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
        <CancelSubheading>클럽 취소사유</CancelSubheading>

        <BigTextArea
          name="cancelReason"
          value={cancelReason}
          placeholder="최소 30자 이상 입력 부탁드립니다"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCancelReason(e.target.value);
          }}
        />
        <CancelWordCount>{cancelReason.length}/30</CancelWordCount>
        <CancelConfirmContainer
          onClick={() => {
            setCancelCheck(!cancelCheck);
          }}
        >
          <CancelWarningCheck>
            {cancelCheck ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                color="rgba(33, 225, 156)"
              />
            ) : (
              <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
            )}
          </CancelWarningCheck>
          <CancelWarningText>
            만약, 기존 신청 정보를 확인 후 취소 사유가 거짓으로 확인 되었을 경우
            클럽 취소가 무산될 수 있습니다.
          </CancelWarningText>
        </CancelConfirmContainer>
        <CancelSubmitButton
          disabled={cancelReason.length < 30 || !cancelCheck}
          onClick={requestCancelApprovedCTA}
        >
          취소 승인 요청하기
        </CancelSubmitButton>
        <CancelCloseButton onClick={closeDrawer}>뒤로가기</CancelCloseButton>
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 10px 40px;
`;

const CancelConfirmContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  margin-left: 30px;
  align-items: center;
  margin-bottom: 50px;
  cursor: pointer;
`;

const CancelWarningCheck = styled.div`
  margin-right: 10px;
`;

const CancelWarningText = styled.div`
  width: 260px;
  color: #505050;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const CancelWordCount = styled.div`
  color: #c4cbd8;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  align-self: flex-end;
  margin-right: 20px;
`;

const CancelSubmitButton = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  background: ${(props) =>
    props.disabled ? "#6f7789" : "rgba(33, 225, 156, 0.62)"};
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
`;

const CancelCloseButton = styled(CancelSubmitButton)`
  background: #6f7789;
  margin-top: 23px;
`;

const CancelTextarea = styled(BigTextArea)``;

const CancelSubheading = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */
  align-self: flex-start;
  margin-left: 20px;
  color: #505050;
  margin-top: 20px;
`;

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
