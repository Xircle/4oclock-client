import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import styled from "styled-components";
import { editApplication } from "../../../lib/api/editApplication";
import { GetMyApplicationsOutput } from "../../../lib/api/types";

interface IProps {
  id: string;
  teamId: number;
  paid?: boolean;
  teamImage: string;
  status: string;
  teamName: string;
  refetch: (
    options?:
      | (RefetchOptions & RefetchQueryFilters<GetMyApplicationsOutput>)
      | undefined,
  ) => Promise<QueryObserverResult<GetMyApplicationsOutput, unknown>>;
}

export default function MyApplicationRow({
  teamImage,
  teamName,
  status,
  id,
  refetch,
}: IProps) {
  const { mutateAsync: mutateEditApplication, isLoading: isFetching } =
    useMutation(editApplication);

  const cancelCTA = async () => {
    const { data } = await mutateEditApplication({
      applicationId: id,
      isCanceled: "true",
    });
    if (data.ok) {
      await refetch();
      alert("취소에 성공하였습니다");
    } else {
      console.log(data.error);
      alert("취소에 실패하였습니다");
    }
  };

  return (
    <Container>
      <LeftContainer>
        <TeamImage src={teamImage} />
      </LeftContainer>
      <RightContainer>
        <TeamNameTag>{teamName}</TeamNameTag>
        {status === "Pending" && (
          <CTAButton style={{ backgroundColor: "#C4CBD8" }} onClick={cancelCTA}>
            신청 취소하기
          </CTAButton>
        )}
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin-bottom: 10px;
`;

const TeamImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const LeftContainer = styled.div`
  width: 100px;
  padding-left: 10px;
  padding-right: 10px;
`;
const RightContainer = styled.div`
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamNameTag = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const CTAButton = styled.div`
  border-radius: 3px;
  font-weight: 500;
  font-size: 11px;
  padding: 5px 3px;
  color: #ffffff;

  cursor: pointer;
`;
