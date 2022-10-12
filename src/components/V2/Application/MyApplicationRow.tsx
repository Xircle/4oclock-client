import styled from "styled-components";

interface IProps {
  id: string;
  teamId: number;
  paid?: boolean;
  teamImage: string;
  status: string;
  teamName: string;
  refetch: () => Promise<void>;
}

export default function MyApplicationRow({
  teamImage,
  teamName,
  status,
  refetch,
}: IProps) {
  const cancelCTA = async () => {
    await refetch();
  };

  return (
    <Container>
      <LeftContainer>
        <TeamImage src={teamImage} />
      </LeftContainer>
      <RightContainer>
        <TeamNameTag>{teamName}</TeamNameTag>
        {status === "Pending" && (
          <CTAButton style={{ backgroundColor: "#C4CBD8" }}>
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
`;
