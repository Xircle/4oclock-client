import { useHistory } from "react-router-dom";
import styled from "styled-components";
import optimizeImage from "../../../lib/optimizeImage";
import { DayNumToKor } from "../../../lib/v2/utils";

interface IProps {
  image?: string;
  name?: string;
  id: number;
  total: number;
  count: number;
}

export default function LeaderTeamRow({
  image,
  name,
  id,
  total,
  count,
}: IProps) {
  const history = useHistory();

  const onClickHandler = () => {};

  return (
    <Conatiner onClick={onClickHandler}>
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
          </RightBodyContainer>
        </RightContainer>
      </Wrapper>
    </Conatiner>
  );
}

const Wrapper = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;

  padding-bottom: 15px;
  border-bottom: 1px solid #dadada;
`;

const Conatiner = styled.div`
  width: 100%;
  padding-left: 30px;
  padding-right: 20px;
  padding-top: 10px;

  color: #505050;

  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;
const RightBodyContainer = styled.div`
  padding: 5px;
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