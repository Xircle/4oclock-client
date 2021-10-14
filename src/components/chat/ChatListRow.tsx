import styled from "styled-components";
import { Avartar, colors } from "../../styles/styles";
import { ConvertSentTime } from "../../lib/utils";
import { IRoom } from "../../lib/api/types";
import { useHistory } from "react-router-dom";

interface Props {
  room: IRoom;
}

export default function ChatListRow({ room }: Props) {
  const history = useHistory();

  return (
    <SContainer
      onClick={() =>
        history.push(`/chatRoom/${room.id}`, {
          id: room.receiver.id,
          profileImageUrl: room.receiver.profileImageUrl,
          username: room.receiver.username,
        })
      }
    >
      <LeftContainer>
        <SAvatar src={room.receiver.profileImageUrl} />
        <LeftTextContainer>
          <UsernameText>
            {room.receiver.username}
            {!room.lastMessage.isRead && <UnreadIndicator></UnreadIndicator>}
          </UsernameText>
          <MessageText>{room.lastMessage.content}</MessageText>
        </LeftTextContainer>
      </LeftContainer>
      <RightContainer>
        {room.latestMessageAt && ConvertSentTime(room.latestMessageAt)}
      </RightContainer>
    </SContainer>
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
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
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
