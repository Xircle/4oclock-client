import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2ApplyProfileRow from "../../../components/V2/UI/V2ApplyProfileRow";
import V2ApproveProfileRow from "../../../components/V2/UI/V2ApproveProfileRow";
import V2CancelRequestProfileRow from "../../../components/V2/UI/V2CancelRequestProfileRow";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamApplications } from "../../../lib/api/getTeamApplications";
import { GetTeamApplications } from "../../../lib/api/types";
import { colors } from "../../../styles/styles";

interface Props extends RouteComponentProps<{ teamId: string }, {}, {}> {}

export default function V2LeaderApprovePage({ match }: Props) {
  const { teamId } = match.params;
  const { data: teamApplicationsData, refetch } = useQuery<
    GetTeamApplications | undefined
  >(["TeamApplications", teamId], () => getTeamApplications(teamId), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (teamApplicationsData) console.log(teamApplicationsData);
  }, [teamApplicationsData]);

  return (
    <Container>
      <V2SubHeaderC title="리더 승인 page" />
      <InfoContainer>
        <InstructionContainer>
          *my 클럽에 신청한 친구들이에요! 꼭 <b>3일안에 승인</b>을 해주세요!
        </InstructionContainer>
        <CountContainer>
          <TotalCountContainer>
            <FontAwesomeIcon icon={faUsers} color={colors.Lime} />
            <TotalCountNumber>
              {teamApplicationsData?.curCount} /{" "}
              {teamApplicationsData?.maxParticipant}명
            </TotalCountNumber>
          </TotalCountContainer>
          <PartialCountContainer>
            신청 인원: 남{teamApplicationsData?.maleApplyCount} 여
            {teamApplicationsData?.femaleApplyCount}
          </PartialCountContainer>
          <PartialCountContainer>
            참여 인원: 남{teamApplicationsData?.maleApproveCount} 여
            {teamApplicationsData?.femaleApproveCount}
          </PartialCountContainer>
        </CountContainer>
        {teamApplicationsData?.cancelRequestedApplicantProfiles &&
        teamApplicationsData.cancelRequestedApplicantProfiles.length > 0 ? (
          <ApplicantRowContainer>
            <RowHeading>승인 취소 요청</RowHeading>
            <RowSubHeadering>
              *my클럽에 승인되었지만 취소를 요청하신 크루분들이십니다!
            </RowSubHeadering>
            {teamApplicationsData?.approvedApplicantProfiles.map(
              (applicant) => {
                return (
                  <Wrapper key={applicant.profileImg}>
                    <V2CancelRequestProfileRow
                      profileImg={applicant.profileImg}
                      username={applicant.username}
                      teamId={teamId}
                      userId={applicant.userId}
                      phoneNumber={applicant?.phoneNumber}
                    />
                  </Wrapper>
                );
              },
            )}
          </ApplicantRowContainer>
        ) : null}

        <ApplicantRowContainer>
          {teamApplicationsData?.pendingApplicantProfiles.map((applicant) => {
            return (
              <Wrapper key={applicant.profileImg}>
                <V2ApplyProfileRow
                  profileImg={applicant.profileImg}
                  username={applicant.username}
                  age={applicant.age}
                  gender={applicant.gender}
                  applicationId={applicant?.applicationId}
                  refetch={refetch}
                />
              </Wrapper>
            );
          })}
        </ApplicantRowContainer>
        <ApplicantRowContainer>
          <RowHeading>my 클럽 프렌즈들</RowHeading>
          <RowSubHeadering>
            *my클럽이 된 프렌즈들이야! 단톡을 파서 프렌즈들을 초대해보자!
          </RowSubHeadering>
          {teamApplicationsData?.approvedApplicantProfiles.map((applicant) => {
            return (
              <Wrapper key={applicant.profileImg}>
                <V2ApproveProfileRow
                  profileImg={applicant.profileImg}
                  username={applicant.username}
                  teamId={teamId}
                  userId={applicant.userId}
                  phoneNumber={applicant?.phoneNumber}
                />
              </Wrapper>
            );
          })}
        </ApplicantRowContainer>
      </InfoContainer>
    </Container>
  );
}

const Wrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const SpaceDiv = styled.div`
  height: 20px;
`;

const RowHeading = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 18px;
`;

const RowSubHeadering = styled.div`
  color: #505050;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 30px;
`;

const ApplicantRowContainer = styled.div`
  margin-top: 30px;
`;

const TotalCountNumber = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #6f7789;
  margin-left: 5px;
`;

const PartialCountContainer = styled.div`
  color: #fd8a66;
  font-weight: 700;
  font-size: 13px;
  margin-top: 8px;
`;

const TotalCountContainer = styled.div`
  align-items: center;
  display: flex;
`;

const CountContainer = styled.div`
  margin-top: 10px;
`;

const Container = styled.div`
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const InstructionContainer = styled.div`
  margin-top: 11px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 9px;
  text-align: center;
  background-color: #dbedff;
  font-weight: 500;
  font-size: 12px;
  color: #8c94a4;
  b {
    color: #fd8a66;
  }
`;
