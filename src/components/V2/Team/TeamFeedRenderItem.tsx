import styled from "styled-components";

interface IProps {
  image?: string;
  name?: string;
  key?: string;
}

export default function TeamFeedRenderItem({ image, name, key }: IProps) {
  return (
    <Conatiner>
      <LeftContainer>
        <Title>{name}</Title>
      </LeftContainer>
      <RightContainer>
        <FeedImg src={image} />
      </RightContainer>
    </Conatiner>
  );
}

const Conatiner = styled.div`
  width: 100%;
  min-height: 100px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  color: #505050;

  &:hover {
    opacity: 0.8;
  }
`;

const LeftContainer = styled.div`
  padding: 10px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
`;

const RightContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10%;
  object-fit: cover;
`;
