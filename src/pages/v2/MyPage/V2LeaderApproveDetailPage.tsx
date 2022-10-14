import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getApplicationByLeader } from "../../../lib/api/getApplicationByLeader";
import { GetApplicationByLeaderData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";

interface Props
  extends RouteComponentProps<{ applicationId: string }, {}, {}> {}

export default function V2LeaderApproveDetailPage({ match }: Props) {
  const { applicationId } = match.params;
  const { data, refetch } = useQuery<GetApplicationByLeaderData | undefined>(
    ["ApplicationByLeader", applicationId],
    () => getApplicationByLeader(applicationId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <Container>
      <V2SubHeaderC title="신청서 및 정보" />
      <BodyContainer>
        <ProfileContainer>
          <ProfileLeftContainer>
            <ProfileImg
              src={optimizeImage(data?.profileImage, {
                width: 60,
                height: 60,
              })}
            />
          </ProfileLeftContainer>
          <ProfileRightContainer></ProfileRightContainer>
        </ProfileContainer>
      </BodyContainer>
    </Container>
  );
}

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Container = styled.div``;
const BodyContainer = styled.div`
  margin-top: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileLeftContainer = styled.div``;

const ProfileRightContainer = styled.div`
  margin-left: 10px;
`;

const PhoneNumberContainer = styled.div``;

const PhoneNumberRow = styled.div``;

const PhoneNumberText = styled.div``;

const PhoneNumberButton = styled.div``;

const PhoneNumberWarning = styled.div``;

const ShortBioContainer = styled.div``;

const ShortBioHeading = styled.div``;

const ShortBioText = styled.div``;

const InstructionContainer = styled.div``;

const InstructionHeading = styled.div``;

const InstructionText = styled.div``;
