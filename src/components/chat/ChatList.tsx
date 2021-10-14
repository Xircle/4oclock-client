import styled from "styled-components";
import ChatListRow from "./ChatListRow";
import { Fragment } from "react";
import { IRoom } from "../../lib/api/types";

interface Props {
  chatRooms?: IRoom[];
}

export default function ChatList({ chatRooms }: Props) {
  return (
    <SContainer>
      {chatRooms?.map((chatRoom) => (
        <Fragment key={chatRoom.receiver.id}>
          <ChatListRow room={chatRoom}></ChatListRow>
        </Fragment>
      ))}
    </SContainer>
  );
}
const SContainer = styled.div`
  width: 90%;
  margin-top: 20px;
`;
