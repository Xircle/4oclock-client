import styled from "styled-components";
import { Room } from "./dummies/ChatDummies";
import ChatListRow from "./ChatListRow";
import { Fragment } from "react";

interface Props {
  chatRooms?: Room[];
}

export default function ChatList({ chatRooms }: Props) {
  return (
    <SContainer>
      {chatRooms?.map((chatRoom, index) => (
        <Fragment key={index}>
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
