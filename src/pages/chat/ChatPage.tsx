import styled from "styled-components";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import ChatList from "../../components/chat/ChatList";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  Container,
  ProcedureHeading,
  SubText,
  ContainerwithLeftRightMargin,
  colors,
} from "../../styles/styles";
import { chatListDummies } from "../../components/chat/dummies/ChatDummies";

interface Props {}

export default function ChatPage(props: Props) {
  const [chatCount, SetChatCount] = useState(chatListDummies.length);
  // should be modified later with correct useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <PageTitle title="채팅" />
      <SContainerwithLeftRightMargin>
        <Heading>이팅 채팅</Heading>
        <SubTextChat>
          <b>
            채팅으로 소통하는 공간이에요! 친구와 함께 맛집을 가보는건 어때요?
          </b>
        </SubTextChat>
        {chatCount === 0 ? (
          <ChatEmptyContainer>
            <p>
              앗! 채팅이 없어요ㅠㅠ <br />
              친구들에게 채팅을 걸어보세요!
            </p>
          </ChatEmptyContainer>
        ) : (
          <ChatList chatRooms={chatListDummies}></ChatList>
        )}
      </SContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="chat" />
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 100px;
`;

const SubTextChat = styled(SubText)`
  margin-top: 25px;
  font-size: 14px;
  width: 315px;
  line-height: 20px;
  color: #8c94a4;
`;

const ChatEmptyContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: ${colors.MidGray};
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
  }
`;

const SContainerwithLeftRightMargin = styled(ContainerwithLeftRightMargin)`
  height: 100vh;
`;
