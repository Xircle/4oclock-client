import styled from "styled-components";

interface Props {
  profileImgUrl: string;
  rightOffset?: string;
  onClick?: () => void;
}

export default function Avatar({ profileImgUrl, rightOffset, onClick }: Props) {
  return (
    <AvartarImg
      src={profileImgUrl}
      rightOffset={rightOffset}
      onClick={onClick}
    />
  );
}

const AvartarImg = styled.img<{ rightOffset?: string }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${(props) => props.rightOffset || "0px"};
  cursor: pointer;
`;
