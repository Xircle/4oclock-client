import styled from "styled-components";

interface Props {
  profileImgUrl: string;
  rightOffset?: string;
  onClick?: () => void;
  width?: string;
}

export default function Avatar({
  profileImgUrl,
  rightOffset,
  onClick,
  width,
}: Props) {
  return (
    <AvartarImg
      src={profileImgUrl}
      rightOffset={rightOffset}
      onClick={onClick}
      width={width}
    />
  );
}

const AvartarImg = styled.img<{ rightOffset?: string; topOffset?: string }>`
  width: ${(props) => props.width || "38px"};
  height: ${(props) => props.width || "38px"};
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${(props) => props.rightOffset || "0px"};
  cursor: pointer;
`;
