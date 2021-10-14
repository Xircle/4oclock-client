import styled from "styled-components";
import { Room } from "./dummies/ChatDummies";
import { Fragment } from "react";
import { Avartar, colors } from "../../styles/styles";
import { ConvertSentTime } from "../../lib/utils";

interface Props {
  room: Room;
}

export default function ChatListRow({ room }: Props) {
  return (
    <>
      <SContainer>
        <LeftContainer>
          <SAvatar src={room.avatar} />
          <LeftTextContainer>
            <UsernameText>
              {room.username}
              {room.unread && <UnreadIndicator></UnreadIndicator>}
            </UsernameText>
            <MessageText>{room.message}</MessageText>
          </LeftTextContainer>
        </LeftContainer>
        <RightContainer>
          {room.sentTime && ConvertSentTime(room.sentTime)}
        </RightContainer>
      </SContainer>
    </>
  );
}

const UnreadIndicator = styled.div`
  background-color: ${colors.MidBlue};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 1px;
`;

const SContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RightContainer = styled.div`
  padding-top: 5px;
  color: #a7b0c0;
  font-size: 13px;
`;

const LeftTextContainer = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  width: 150px;
`;

const SAvatar = styled(Avartar)`
  width: 55px;
  height: 55px;
  margin: 0px;
`;

const UsernameText = styled.div`
  font-size: 13px;
  color: ${colors.Black};
  display: flex;
  justify-content: flex-start;
`;
const MessageText = styled.p`
  padding-top: 5px;
  color: #a7b0c0;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
