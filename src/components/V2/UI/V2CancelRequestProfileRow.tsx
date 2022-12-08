import { faClone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { editApplication } from "../../../lib/api/editApplication";
import { Gender, GetTeamApplications } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { ApplicationStatus } from "../../../lib/v2/enums";
import { colors } from "../../../styles/styles";

interface Props {
  profileImg: string;
  username: string;
  teamId: string;
  userId?: string;
  phoneNumber?: string;
  applicationId?: string;
  refetch: (
    options?:
      | (RefetchOptions & RefetchQueryFilters<GetTeamApplications | undefined>)
      | undefined,
  ) => Promise<QueryObserverResult<GetTeamApplications | undefined, unknown>>;
}

export default function V2CancelRequestProfileRow({
  profileImg,
  username,
  teamId,
  userId,
  phoneNumber,
  applicationId,
  refetch,
}: Props) {
  const history = useHistory();
  const { mutateAsync: mutateEditApplication, isLoading: isFetching } =
    useMutation(editApplication);

  const ApproveCancelCTA = async () => {
    if (!applicationId) {
      alert("지원서가 존재하지 않습니다");
      return;
    }
    const { data } = await mutateEditApplication({
      applicationId: applicationId,
      status: ApplicationStatus.Disapproved,
      cancelReason: "",
      isCancelRequested: "false",
    });
    if (data.ok) {
      await refetch();
      alert("취소 승인 성공하였습니다");
    } else {
      alert("취소 승인 실패하였습니다");
    }
  };

  const ApproveDetailCTA = () => {
    if (teamId && userId) {
      history.push(`/v2/leaderpage/approve_detail/${userId}/${teamId}`);
    }
  };

  const CopyCTA = () => {
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber).then((value) => {
        alert("복사되었습니다");
      });
    }
  };

  return (
    <Container>
      <LeftContainer>
        <ProfileImg
          src={optimizeImage(profileImg, {
            width: 60,
            height: 60,
          })}
        />
      </LeftContainer>
      <RightContainer>
        <RightRow>
          <NameTag style={{ marginRight: 10 }}>{username}</NameTag>
          <ApproveCancelRequestButton onClick={ApproveCancelCTA}>
            취소 승인하기
          </ApproveCancelRequestButton>
          <CancelRequestDetailButton onClick={ApproveDetailCTA}>
            요청서 보기
          </CancelRequestDetailButton>
        </RightRow>
        <RightRow style={{ cursor: "pointer" }}>
          <PhoneNumberTag>전화번호 {phoneNumber}</PhoneNumberTag>
          <FontAwesomeIcon icon={faCopy} color="#6f7789" onClick={CopyCTA} />
        </RightRow>
      </RightContainer>
    </Container>
  );
}

const ApproveCancelRequestButton = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  color: white;
  padding: 4px 11px;
  background-color: #fd8a66;
  border-radius: 3px;
  cursor: pointer;
`;

const CancelRequestDetailButton = styled(ApproveCancelRequestButton)`
  background-color: #c4cbd8;
  color: white;
  margin-left: 10px;
`;

const NameTag = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #8c94a4;
`;

const PhoneNumberTag = styled.div`
  text-decoration-line: underline;
  color: #6f7789;
  font-weight: 400;
  font-size: 13px;
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  margin-right: 10px;
`;

const RightRow = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
