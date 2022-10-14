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

interface Props {
  profileImg: string;
  username: string;
  age: number;
  gender: Gender;
  applicationId?: string;
  refetch: (
    options?:
      | (RefetchOptions & RefetchQueryFilters<GetTeamApplications | undefined>)
      | undefined,
  ) => Promise<QueryObserverResult<GetTeamApplications | undefined, unknown>>;
}

export default function V2ApplyProfileRow({
  profileImg,
  username,
  age,
  gender,
  applicationId,
  refetch,
}: Props) {
  const history = useHistory();

  const { mutateAsync: mutateEditApplication, isLoading: isFetching } =
    useMutation(editApplication);

  const cancelCTA = async () => {
    if (!applicationId) {
      alert("거절하기에 실패했습니다.");
      return;
    }
    const { data } = await mutateEditApplication({
      applicationId: applicationId,
      status: ApplicationStatus.Disapproved,
    });
    if (data.ok) {
      await refetch();
      alert("거절하기에 성공하였습니다");
    } else {
      console.log(data.error);
      alert("거절하기에 실패하였습니다");
    }
  };

  const approveCTA = async () => {
    if (!applicationId) {
      alert("승인 실패했습니다.");
      return;
    }
    const { data } = await mutateEditApplication({
      applicationId: applicationId,
      status: ApplicationStatus.Approved,
    });
    if (data.ok) {
      await refetch();
      alert("승인 성공하였습니다");
    } else {
      console.log(data.error);
      alert("승인 실패하였습니다");
    }
  };

  const detailCTA = () => {
    history.push(`/v2/leaderpage/approve_detail/${applicationId}`);
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
        <RLContainer>
          <RLRow>
            {username}{" "}
            <b>
              {gender == "Male" ? "남자 " : gender == "Female" ? "여자 " : ""}
              {age ? `${age}살` : ""}
            </b>
          </RLRow>
          <RLRow onClick={detailCTA}>
            <b>신청서 보러가기</b>
          </RLRow>
        </RLContainer>
        <RRContainer>
          <LimeButton onClick={approveCTA}>승인하기</LimeButton>
          <GreyButton onClick={cancelCTA}>거절하기</GreyButton>
        </RRContainer>
      </RightContainer>
    </Container>
  );
}

const IButton = styled.span`
  padding: 4px 11px;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
`;

const LimeButton = styled(IButton)`
  background-color: rgba(33, 225, 156, 0.62);
  color: #6f7789;
  margin-right: 8px;
`;

const GreyButton = styled(IButton)`
  background-color: #c4cbd8;
  color: #ffffff;
`;

const RLRow = styled.div`
  color: #a7b0c0;
  font-weight: 600;
  font-size: 12px;

  b {
    margin-right: 2px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: underline #a7b0c0;
  }
`;

const RLContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 8px;
  flex-direction: column;
  height: 100%;
`;

const RRContainer = styled.div``;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
