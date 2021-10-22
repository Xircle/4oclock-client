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
import { useQuery } from "react-query";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { GetMyRooms, IRoom } from "../../lib/api/types";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import routes from "../../routes";

export default function ChatListPage() {
  const [chatCount, setChatCount] = useState(0);
  const { data, isLoading } = useQuery<GetMyRooms | undefined>(
    ["room"],
    () => getMyRooms(),
    {
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );
  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      alert("로그인이 필요한 페이지입니다!");
      window.location.href = routes.root;
    }
    return () => {
      console.info("disconnect sockets");
    };
  }, []);

  useEffect(() => {
    if (!data?.myRooms) return;
    setChatCount(data?.myRooms?.length);
  }, [data]);

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
          <ChatList chatRooms={data?.myRooms} />
        )}
      </SContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="chat" />
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 80px;
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
  margin-top: 30px;
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
  min-height: 100vh;
  margin-bottom: 50px;
`;
