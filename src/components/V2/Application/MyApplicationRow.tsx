import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import styled from "styled-components";
import { editApplication } from "../../../lib/api/editApplication";
import { GetMyApplicationsOutput, GMALeaderData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { ApplicationStatus } from "../../../lib/v2/enums";

interface IProps {
  id: string;
  teamId: number;
  paid?: boolean;
  teamImage: string;
  status: ApplicationStatus;
  teamName: string;
  leaderData?: GMALeaderData;
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
  leaderData,
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
      alert("취소에 실패하였습니다");
    }
  };

  const CopyCTA = () => {
    if (leaderData?.leaderPhoneNumber) {
      navigator.clipboard
        .writeText(leaderData?.leaderPhoneNumber)
        .then((value) => {
          alert("복사되었습니다");
        });
    }
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <TeamImage
            src={optimizeImage(teamImage, { width: 50, height: 50 })}
          />
        </LeftContainer>
        <RightContainer>
          <TeamNameTag>{teamName}</TeamNameTag>
          {status === ApplicationStatus.Pending ? (
            <CTAButton
              style={{ backgroundColor: "#C4CBD8" }}
              onClick={cancelCTA}
            >
              신청 취소하기
            </CTAButton>
          ) : status === ApplicationStatus.Approved && leaderData ? (
            <>
              <LeaderContainer>
                <LeaderImg
                  src={optimizeImage(leaderData?.leaderProfileUrl, {
                    width: 30,
                    height: 30,
                  })}
                />{" "}
                <LeaderText>{leaderData?.leaderName} leader</LeaderText>
              </LeaderContainer>
              <PhoneNumberRow>
                <PhoneNumberText>
                  전화번호 {leaderData.leaderPhoneNumber}
                </PhoneNumberText>
                <PhoneNumberButton onClick={CopyCTA}>복사</PhoneNumberButton>
              </PhoneNumberRow>
            </>
          ) : (
            <></>
          )}
        </RightContainer>
      </Container>
      <CTA2Button style={{ backgroundColor: "#C4CBD8" }} onClick={() => {}}>
        승인 취소 요청하기
      </CTA2Button>
    </>
  );
}

const CTA2Button = styled.span`
  border-radius: 3px;
  font-weight: 500;
  font-size: 11px;
  padding: 5px 3px;
  color: #ffffff;
  background-color: #c4cbd8;
  cursor: pointer;
`;

const LeaderImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  object-fit: cover;
  display: inline-block;
`;

const LeaderContainer = styled.div`
  margin-top: 14px;
  white-space: nowrap;
  overflow-x: hidden;
  max-width: 200px;
  align-items: center;
  display: flex;
  overflow: visible;
`;

const LeaderText = styled.span`
  margin-left: 5px;
  color: #8c94a4;
  font-size: 11px;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100%;
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
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamNameTag = styled.div`
  font-weight: 700;
  font-size: 18px;

  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`;

const CTAButton = styled.div`
  border-radius: 3px;
  font-weight: 500;
  font-size: 11px;
  padding: 5px 3px;
  color: #ffffff;

  cursor: pointer;
`;

const PhoneNumberRow = styled.div`
  display: flex;
  align-items: center;
`;

const PhoneNumberText = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-decoration-line: underline;
  color: #6f7789;
`;

const PhoneNumberButton = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  background: rgba(33, 225, 156, 0.33);
  border-radius: 8px;
  color: #12121d;
  padding: 4px 11px;
  margin-left: 10px;
`;
