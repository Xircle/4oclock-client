import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2ApplyProfileRow from "../../../components/V2/UI/V2ApplyProfileRow";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamApplications } from "../../../lib/api/getTeamApplications";
import { GetTeamApplications } from "../../../lib/api/types";
import { colors } from "../../../styles/styles";

interface Props extends RouteComponentProps<{ teamId: string }, {}, {}> {}

export default function V2LeaderApprovePage({ match }: Props) {
  const { teamId } = match.params;
  const { data: teamApplicationsData } = useQuery<
    GetTeamApplications | undefined
  >(["TeamApplications", teamId], () => getTeamApplications(teamId), {
    onError: (err: any) => {
      alert(err);
      return;
    },
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

        <ApplyContainer>
          {teamApplicationsData?.pendingApplicantProfiles.map((applicant) => {
            return <V2ApplyProfileRow profileImg={applicant.profileImg} />;
          })}
        </ApplyContainer>
      </InfoContainer>
    </Container>
  );
}

const ApplyContainer = styled.div`
  margin-top: 30px;
`;

const TotalCountNumber = styled.span`
  font-weight: 500;
  font-size: 10px;
  color: #6f7789;
  margin-left: 5px;
`;

const PartialCountContainer = styled.div`
  color: #fd8a66;
  font-weight: 700;
  font-size: 11px;
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
