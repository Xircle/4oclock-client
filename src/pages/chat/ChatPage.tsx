import styled from "styled-components";
import useSocket from "../../hooks/useSocket";
import { useParams } from "react-router-dom";
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
import { useQuery } from "react-query";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { IRoom } from "../../lib/api/types";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {}

export default function ChatPage(props: Props) {
  const { roomId = "fc88ebc3-1b06-418c-9dde-c81ffd4e36a3" } =
    useParams<{ roomId: string }>();
  const [msg, setMsg] = useState("");
  const [socket, disconnect] = useSocket(roomId);
  const [isEntering, setIsEntering] = useState(false);
  const [chatCount, SetChatCount] = useState(0);

  const { data: myRooms, isLoading } = useQuery<IRoom[] | undefined>(
    ["room"],
    () => getMyRooms(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (!myRooms) return;
    SetChatCount(myRooms?.length);
  }, [myRooms]);

  const onChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("send_message", {
      roomId,
      content: msg,
    });
  };

  if (isLoading) {
    <>
      <LoaderBackdrop />
      <LoaderWrapper>
        <ClipLoader
          loading={isLoading}
          color={colors.MidBlue}
          css={{ name: "width", styles: "border-width: 4px;" }}
          size={30}
        />
      </LoaderWrapper>
    </>;
  }

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
          <ChatList chatRooms={myRooms}></ChatList>
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
