import styled from "styled-components";

interface Props {
  image: string;
  name: string;
  key: string;
}

export default function TeamFeedRenderItem(props: Props) {
  return <Conatiner></Conatiner>;
}

const Conatiner = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
`;
