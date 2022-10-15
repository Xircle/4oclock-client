import { useEffect } from "react";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getApplicationByLeader } from "../../../lib/api/getApplicationByLeader";
import { Gender, GetApplicationByLeaderData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";

interface Props
  extends RouteComponentProps<{ param1?: string; param2?: string }, {}, {}> {}

export default function V2LeaderApproveDetailPage({ match }: Props) {
  const { param1, param2 } = match.params;
  const { data, refetch } = useQuery<GetApplicationByLeaderData | undefined>(
    ["ApplicationByLeader", param1, param2],
    () =>
      getApplicationByLeader({
        param1: param1,
        param2: param2 ? parseInt(param2) : undefined,
      }),
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
          <ProfileRightContainer>
            <Row>
              <NameTag>{data?.username}</NameTag>
              <MBTITag>{data?.mbti}</MBTITag>
            </Row>
            <JobTag>{data?.job}</JobTag>
            <UnivTag>
              {data?.university} / {data?.age}살 /{" "}
              {data?.gender == "Male" ? "남" : "여"}
            </UnivTag>
          </ProfileRightContainer>
        </ProfileContainer>
        {data?.phoneNumber && (
          <PhoneNumberContainer>
            <PhoneNumberRow>
              <PhoneNumberText>전화번호 {data.phoneNumber}</PhoneNumberText>
              <PhoneNumberButton onClick={() => {}}>복사</PhoneNumberButton>
            </PhoneNumberRow>
          </PhoneNumberContainer>
        )}
      </BodyContainer>
    </Container>
  );
}

const UnivTag = styled.div`
  color: #6f7789;
  font-weight: 400;
  font-size: 13px;
`;

const JobTag = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #8c94a4;
`;

const Row = styled.div`
  display: flex;
`;

const NameTag = styled.div`
  color: #222222;
  font-weight: 700;
  font-size: 16px;
  margin-right: 7px;
`;

const MBTITag = styled.div`
  color: #e67255;
  font-weight: 700;
  font-size: 16px;
`;

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
  margin-left: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const PhoneNumberContainer = styled.div``;

const PhoneNumberRow = styled.div`
  display: flex;
  align-items: center;
`;

const PhoneNumberText = styled.div``;

const PhoneNumberButton = styled.div``;

const PhoneNumberWarning = styled.div``;

const ShortBioContainer = styled.div``;

const ShortBioHeading = styled.div``;

const ShortBioText = styled.div``;

const InstructionContainer = styled.div``;

const InstructionHeading = styled.div``;

const InstructionText = styled.div``;
