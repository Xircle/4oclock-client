import styled from "styled-components";

interface Props {
  profileImgUrl: string;
  rightOffset?: string;
}

export default function Avatar({ profileImgUrl, rightOffset }: Props) {
  return <AvartarImg src={profileImgUrl} rightOffset={rightOffset} />;
}

const AvartarImg = styled.img<{ rightOffset?: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${(props) => props.rightOffset || "0px"};
  cursor: pointer;
`;
