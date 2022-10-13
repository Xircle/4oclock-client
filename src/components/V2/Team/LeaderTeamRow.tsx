import { useHistory } from "react-router-dom";
import styled from "styled-components";
import optimizeImage from "../../../lib/optimizeImage";
import routes from "../../../routes";

interface IProps {
  image?: string;
  name?: string;
  id: number;
  total: number;
  count?: number;
}

export default function LeaderTeamRow({
  image,
  name,
  id,
  total,
  count,
}: IProps) {
  const myCount = count ? count : 0;
  const history = useHistory();

  const onClickHandler = () => {
    history.push(routes.v2LeaderApprovePage, { teamId: id });
  };

  return (
    <Conatiner>
      <Wrapper>
        <LeftContainer>
          <FeedImg
            src={optimizeImage(image, {
              width: 100,
              height: 100,
            })}
          />
        </LeftContainer>
        <RightContainer>
          <RightBodyContainer>
            <Title>{name}</Title>
            {total - myCount > 0 && (
              <WarningText>잔여 {total - myCount}석 승인 필요</WarningText>
            )}

            <ButtonContainer>
              <CTAButton onClick={onClickHandler}>
                my 클럽 승인하기{">>"}
              </CTAButton>
            </ButtonContainer>
          </RightBodyContainer>
        </RightContainer>
      </Wrapper>
    </Conatiner>
  );
}

const Wrapper = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;

  padding-bottom: 15px;
`;

const Conatiner = styled.div`
  width: 100%;
  padding-top: 10px;

  color: #505050;
`;
const RightBodyContainer = styled.div`
  padding: 5px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RightContainer = styled.div`
  flex: 1;
  max-width: 210px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
`;

const LeftContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10%;
  object-fit: cover;
`;

const ButtonContainer = styled.div``;

const CTAButton = styled.span`
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 500;
  background-color: #21e19c;
  border-radius: 3px;
  color: #6f7789;

  cursor: pointer;
`;

const WarningText = styled.div`
  color: #ff0000;
  font-weight: 700;
  font-size: 14px;
`;
