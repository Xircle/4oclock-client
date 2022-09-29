import styled from "styled-components";

interface IProps {
  image?: string;
  name?: string;
  key?: string;
}

export default function TeamFeedRenderItem({ image, name, key }: IProps) {
  return <Conatiner>{name}</Conatiner>;
}

const Conatiner = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  background-color: red;
`;
