import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { Container, colors, Avartar } from "../../styles/styles";
import { Fragment, useEffect, useRef } from "react";
import { chatMessageDummies } from "../../components/chat/dummies/ChatDummies";
import { useHistory } from "react-router-dom";
import { faArrowLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatMessage from "../../components/chat/ChatMessage";
import { Scrollbars } from "react-custom-scrollbars-2";

interface Props {}

export default function ChatRoomPage(props: Props) {
  const preventDefaultAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const history = useHistory();
  return (
    <SContainer>
      <PageTitle title="채팅" />
      <Header>
        <LeftHeaderContainer>
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
            icon={faArrowLeft}
            color={colors.Black}
            size="lg"
            onClick={() => history.goBack()}
          />
          <SAvartar src="/avatar/Avartar001.jpeg" />
          <CounterPartName>{chatMessageDummies[0].username}</CounterPartName>
        </LeftHeaderContainer>
        <RightHeaderContainer></RightHeaderContainer>
      </Header>
      <SScrollbars
        autoHide={true}
        ref={(scrollbar) => {
          scrollbar?.scrollTop(5000000000);
        }}
      >
        <MessageContainer>
          {chatMessageDummies?.map((message, index) => (
            <Fragment key={index}>
              <ChatMessage {...message}></ChatMessage>
            </Fragment>
          ))}
        </MessageContainer>
      </SScrollbars>
      <InputContainer>
        <form onSubmit={preventDefaultAction}>
          <SInput placeholder="메세지를 입력해주세요" name="MessageInput" />
          <SendButton>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faArrowUp}
              color="white"
              size="lg"
            />
          </SendButton>
        </form>
      </InputContainer>
    </SContainer>
  );
}

const SendButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${colors.MidBlue};
`;

const SInput = styled.input`
  padding: 0 10px;
  width: 340px;
  height: 60px;
  box-shadow: 0px 2px 28px rgba(75, 88, 208, 0.1);
  border-radius: 36px;
  border: 1px solid #f5f5f5;
  placeholder {
    color: #a7b0c0;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;
`;

const SScrollbars = styled(Scrollbars)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

const MessageContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
`;
const Header = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 10px -10px;
  font-size: 14px;
  align-items: center;
`;

const LeftHeaderContainer = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const RightHeaderContainer = styled.div``;

const SAvartar = styled(Avartar)`
  width: 40px;
  height: 40px;
  margin: 0px;
`;

const CounterPartName = styled.span`
  margin-left: 10px;
`;
