import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { editApplication } from "../../../lib/api/editApplication";
import { getApplicationByLeader } from "../../../lib/api/getApplicationByLeader";
import { GetApplicationByLeaderData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { ApplicationStatus } from "../../../lib/v2/enums";

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
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const { mutateAsync: mutateEditApplication, isLoading: isFetching } =
    useMutation(editApplication);

  const approveCTA = async () => {
    if (!param1 || param2) {
      alert("승인 실패했습니다.");
      return;
    }
    const { data } = await mutateEditApplication({
      applicationId: param1,
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
  const CopyCTA = () => {
    if (data?.phoneNumber) {
      navigator.clipboard.writeText(data?.phoneNumber).then((value) => {
        alert("복사되었습니다");
      });
    }
  };

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
              <PhoneNumberButton onClick={CopyCTA}>복사</PhoneNumberButton>
            </PhoneNumberRow>
            <PhoneNumberWarning>
              * 개인 전화번호 유출시 법적처벌을 받을 수 있습니다
            </PhoneNumberWarning>
          </PhoneNumberContainer>
        )}
        <ShortBioContainer>
          <ShortBioHeading>자기소개</ShortBioHeading>
          <ShortBioText>{data?.shortBio}</ShortBioText>
        </ShortBioContainer>
        <InstructionContainer>
          <InstructionHeading>🙋‍♀️클럽에 신청한 이유+자기소개</InstructionHeading>

          <InstructionText>{data?.content}</InstructionText>
        </InstructionContainer>
      </BodyContainer>
      {data?.phoneNumber ? (
        <RecommendationContainer>
          <RecommendationHeading>🔥초간단 단톡파기🔥</RecommendationHeading>
          <RecommendationSubHeading>
            전화번호 복사! {">"} 저장 {">"} 단톡에 프렌즈 초대하기
          </RecommendationSubHeading>
        </RecommendationContainer>
      ) : (
        <ApproveButton onClick={approveCTA}>승인하기</ApproveButton>
      )}
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
  padding-left: 30px;
  padding-right: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-bottom: 18px;
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

const PhoneNumberWarning = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #6f7789;

  margin-top: 15px;
`;

const ShortBioContainer = styled.div`
  margin-top: 30px;
`;

const ShortBioHeading = styled.div`
  color: #12121d;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
`;

const ShortBioText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #505050;
  margin-top: 8px;
`;

const InstructionContainer = styled.div`
  margin-top: 35px;
`;

const InstructionHeading = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #505050;
`;

const InstructionText = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  color: #505050;
  padding: 13px;
  margin-top: 15px;

  border: 1px solid #eae1e0;
  border-radius: 10px;
`;

const RecommendationContainer = styled.div`
  background-color: rgba(33, 225, 156, 0.33);
  border-radius: 8px;
  width: 350px;
  height: 90px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const RecommendationHeading = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #505050;
`;

const RecommendationSubHeading = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #505050;
`;

const ApproveButton = styled.div`
  background: rgba(33, 225, 156, 0.33);
  border-radius: 8px;
  width: 200px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;

  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #505050;
  cursor: pointer;
`;
