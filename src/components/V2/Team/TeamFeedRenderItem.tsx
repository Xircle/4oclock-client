import styled from "styled-components";

interface IProps {
  image?: string;
  name?: string;
  key?: string;
}

export default function TeamFeedRenderItem({ image, name, key }: IProps) {
  return (
    <Conatiner>
      <LeftContainer>{name}</LeftContainer>
      <RightContainer>{name}</RightContainer>
    </Conatiner>
  );
}

const Conatiner = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: red;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  background-color: green;

  width: 245px;
`;

const RightContainer = styled.div`
  background-color: black;
  width: 100px;
  height: 100px;
`;
