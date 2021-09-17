import styled from "styled-components";
import type { Participants } from "../../lib/api/types";

interface Props extends Participants {}

export default function PlaceAvatar({ userId, profileImgUrl }: Props) {
  return (
    <AvatarWrapper key={userId}>
      <AvartarImg src={profileImgUrl}></AvartarImg>
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div`
  margin-right: -8px;
`;

const AvartarImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;
