import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import PageTitle from "../../components/PageTitle";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import {
  Container,
  ProcedureHeading,
  SubText,
  MainBtn,
  ContainerwithLeftRightMargin,
  colors,
  BigTextArea,
} from "../../styles/styles";
import { useMutation } from "react-query";
import { cancelReservation } from "../../lib/api/cancelReservation";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import { toast } from "react-toastify";
import routes from "../../routes";

interface Props extends RouteComponentProps<{}, {}, { placeId: string }> {}

export default function CancelReservationPage({ history, location }: Props) {
  const { placeId } = location.state;
  const [cancelReason, SetReasonMain] = useState<string>("");
  const [detailReason, SetReasonDetail] = useState<string>("");
  const { mutateAsync: mutateCancelReservation, isLoading: isFetching } =
    useMutation(cancelReservation);

  const onClickHandler = async () => {
    if (!placeId) return;
    const { data } = await mutateCancelReservation({
      placeId,
      cancelReason,
      detailReason,
    });
    if (!data.ok) {
      throw new Error(data.error);
    }
    toast.info("예약이 취소되었습니다", {
      position: toast.POSITION.TOP_CENTER,
    });
    history.replace(routes.myPlace);
  };

  return (
    <Container>
      <PageTitle title="예약 취소하기" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>연고이팅 모임 취소하기</Heading>
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
        {isFetching && (
          <>
            <LoaderBackdrop />
            <LoaderWrapper>
              <ClipLoader
                loading={isFetching}
                color={colors.MidBlue}
                css={{ name: "width", styles: "border-width: 4px;" }}
                size={30}
              />
            </LoaderWrapper>
          </>
        )}
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
