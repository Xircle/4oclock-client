import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import BackButtonLayout from "../components/shared/BackButtonLayout";
import {
  Container,
  ProcedureHeading,
  SubText,
  MainBtn,
  ContainerwithLeftRightMargin,
  LinkWithoutUnderLine,
  colors,
  BigTextArea,
} from "../styles/styles";
import { useMutation } from "react-query";
import { cancelReservation } from "../lib/api/cancelReservation";
import { useState } from "react";
import { CancelReservationOutput } from "../lib/api/types";

interface Props {
  placeId: string;
}

export default function CancelReservationPage({ placeId }: Props) {
  const [cancelReason, SetReasonMain] = useState<string>("");
  const [detailReason, SetReasonDetail] = useState<string>("");
  const {
    mutateAsync: mutateCancelReservation,
    isLoading: isPatching,
  } = useMutation(cancelReservation);

  const onClickHandler = () => {
    mutateCancelReservation({
      placeId,
      cancelReason,
      detailReason,
    });
  };

  return (
    <Container>
      <PageTitle title="예약 취소하기" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>네시모해 모임 취소하기</Heading>
          <SubTextRequest>
            <b>정말로 취소하실건가요? 모임 취소사유와 상세사유를 적어주세요.</b>
          </SubTextRequest>
          <SubHeading>취소사유</SubHeading>
          <select
            style={{ marginTop: "12px" }}
            name="ReasonSelect"
            value={cancelReason}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              SetReasonMain(e.target.value);
            }}
          >
            <option value="" style={{ color: colors.BareGray }}>
              취소사유를 선택해주세요
            </option>
            <option value="신청실수" style={{ color: colors.Black }}>
              신청실수
            </option>
            <option value="개인일정" style={{ color: colors.Black }}>
              개인일정
            </option>
            <option value="단순변심" style={{ color: colors.Black }}>
              단순변심
            </option>
            <option value="기타" style={{ color: colors.Black }}>
              기타
            </option>
          </select>

          <SubHeading>상세사유</SubHeading>
          <BigTextArea
            name="ReasonDetail"
            placeholder="취소 이유를 입력해주세요(최대 500자)"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              SetReasonDetail(e.target.value);
            }}
          />
          <MainBtnCancelReservation
            disabled={!cancelReason || !detailReason}
            onClick={onClickHandler}
          >
            신청 취소하기
          </MainBtnCancelReservation>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 30px;
`;

const SubTextRequest = styled(SubText)`
  margin-top: 19px;
  font-size: 14px;
  width: 315px;
  line-height: 20px;
  color: #8c94a4;
`;

const SubHeading = styled.p`
  padding-top: 23px;
  font-weight: bold;
  font-size: 18px;
  b {
    color: ${colors.MidGray};
    font-weight: normal;
  }
`;

const MainBtnCancelReservation = styled(MainBtn)`
  margin-top: 150px;
`;
