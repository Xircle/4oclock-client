import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import {
  Container,
  SubText,
  ContainerwithLeftRightMargin,
  colors,
  Avartar,
} from "../../styles/styles";
import {
  chatMessageDummies,
  Message,
} from "../../components/chat/dummies/ChatDummies";
import { useHistory } from "react-router-dom";
import {
  faArrowLeft,
  faArrowUp,
  faEllipsisV,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatMessage from "../../components/chat/ChatMessage";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Collapse, Card, CardBody, Button } from "reactstrap";

interface Props {}

export default function ChatRoomPage(props: Props) {
  const [messages, SetMessages] = useState<Message[]>([
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "그래서 님 티어가..?",
    },
    {
      userId: 1,
      username: "유저2",
      avatar: "/avatar/Avartar002.jpeg",
      message: "반가워요",
    },
    {
      userId: 0,
      username: "유저1",
      avatar: "/avatar/Avartar001.jpeg",
      message: "안녕하세요",
    },
  ]);
  const [messageInput, SetMessageInput] = useState("");
  const [isCollapse, SetIsCollapse] = useState(false);
  const [isCollapseScrollButton, SetIsCollapseScrollButton] = useState(false);
  const [isFirstRefresh, SetIsFirstRefresh] = useState(true);
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    scrollbarRef.current?.scrollTop(5000000000);
  }, [scrollbarRef]);

  const preventDefaultAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetMessageInput(e.target.value);
  };

  const handleSubmit = () => {
    if (messageInput) {
      messages.unshift({
        userId: 0,
        username: "유저 1",
        avatar: "/avatar/Avartar001.jpeg",
        message: messageInput,
      });
      SetMessages(messages);
      SetMessageInput("");
    }
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
        <RightHeaderContainer>
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
            icon={faEllipsisV}
            color={colors.Black}
            size="lg"
            onClick={() => SetIsCollapse(!isCollapse)}
          />
        </RightHeaderContainer>
        <div
          style={{ position: "absolute", top: "100%", right: 10, zIndex: 100 }}
        >
          <Collapse isOpen={isCollapse}>
            <CollapseButtonContainer>
              <CollapseButton>채팅방 나가기</CollapseButton>
              <CollapseButton>차단하기</CollapseButton>
              <CollapseButton>신고하기</CollapseButton>
            </CollapseButtonContainer>
          </Collapse>
        </div>
      </Header>

      <SScrollbars
        ref={scrollbarRef}
        autoHide={true}
        // ref={(scrollbar) => {
        //   if (isFirstRefresh) {
        //     scrollbar?.scrollTop(5000000000);
        //     SetIsFirstRefresh(false);
        //   }
        // }}
        onScrollFrame={(values) => {
          if (values.top < 0.9) {
            SetIsCollapseScrollButton(true);
          } else {
            SetIsCollapseScrollButton(false);
          }
        }}
      >
        <MessageContainer>
          {messages?.map((message, index) => (
            <Fragment key={index}>
              <ChatMessage {...message}></ChatMessage>
            </Fragment>
          ))}
        </MessageContainer>
      </SScrollbars>
      <ScrollToBottomContainer>
        <Collapse isOpen={isCollapseScrollButton}>
          <ScrollToBottomButton
            onClick={() => {
              scrollbarRef.current?.scrollToBottom();
            }}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faArrowDown}
              color="black"
              size="lg"
            />
          </ScrollToBottomButton>
        </Collapse>
      </ScrollToBottomContainer>
      <InputContainer>
        <form onSubmit={preventDefaultAction}>
          <SInput
            placeholder="메세지를 입력해주세요"
            value={messageInput}
            name="MessageInput"
            onChange={handleMessageInputChange}
          />
          <SendButton onClick={handleSubmit}>
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

const ScrollToBottomContainer = styled.div`
  bottom: 100px;
  right: 15px;
  position: absolute;
`;

const ScrollToBottomButton = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${colors.BareGray};
  border: 1px solid ${colors.BareGray};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SendButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  right: 25px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${colors.MidBlue};
`;

const SInput = styled.input`
  padding: 0 10px;
  padding-right: 80px;
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
  position: relative;
`;

const SScrollbars = styled(Scrollbars)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
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
  position: relative;
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

const CollapseButtonContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const CollapseButton = styled.div`
  width: 100px;
  background-color: white;
  border: 1px solid white;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.Black};
  font-size: 13px;
  cursor: pointer;
  :hover {
    background-color: #f0f0f0;
    border: 1px solid #f0f0f0;
  }
`;
