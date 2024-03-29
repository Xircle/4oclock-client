import styled from "styled-components";
import { Avartar, colors } from "../../styles/styles";
import { ConvertSentTimeForList } from "../../lib/utils";
import { IRoom } from "../../lib/api/types";
import { useHistory } from "react-router-dom";
import optimizeImage from "../../lib/optimizeImage";

interface Props {
  room: IRoom;
}

export default function ChatListRow({ room }: Props) {
  const history = useHistory();

  return (
    <SContainer
      onClick={() =>
        history.push(`/v1/chatRoom/${room.id}`, {
          receiverId: room.receiver.id,
          profileImageUrl: room.receiver.profileImageUrl,
          username: room.receiver.username,
        })
      }
    >
      <LeftContainer>
        <SAvatar
          src={optimizeImage(room.receiver.profileImageUrl, {
            width: 55,
            height: 55,
          })}
        />
        <LeftTextContainer>
          <UsernameText isRead={room.lastMessage.isRead}>
            {room.receiver.username}
            {!room.lastMessage.isRead && <UnreadIndicator />}
          </UsernameText>
          <MessageText isRead={room.lastMessage.isRead}>
            {room.lastMessage.content}
          </MessageText>
        </LeftTextContainer>
      </LeftContainer>
      <RightContainer>
        {room.latestMessageAt && ConvertSentTimeForList(room.latestMessageAt)}
      </RightContainer>
    </SContainer>
  );
}

const UnreadIndicator = styled.div`
  background-color: ${colors.MidBlue};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 7px;
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
  text-align: center;
`;

const LeftTextContainer = styled.div`
  padding-top: 5px;
  padding-left: 15px;
  width: 150px;
`;

const SAvatar = styled(Avartar)`
  width: 55px;
  height: 55px;
  margin: 0px;
`;

const UsernameText = styled.div<{ isRead: boolean }>`
  font-size: 13px;
  font-weight: ${(props) => !props.isRead && "bold"};
  color: ${colors.Black};
  display: flex;
  justify-content: flex-start;
`;
const MessageText = styled.p<{ isRead: boolean }>`
  padding-top: 5px;
  color: ${(props) => (props.isRead ? "#a7b0c0" : colors.MidBlue)};
  font-size: 12px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2em;
  height: calc(2.4em + 5px);
  word-wrap: break-word;
  overflow: hidden;
`;
