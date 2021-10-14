import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { Container, colors, Avartar, MainBtn } from "../../styles/styles";
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
import Modal from "../../components/UI/Modal";
import { ReservationModalWrapper } from "../reservation/ReservationPage";

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
  const [isLeaveRoomClicked, SetIsLeaveRoomClicked] = useState(false);
  const [isBlockUserClicked, SetIsBlockUserClicked] = useState(false);
  const [isReportUserClicked, SetIsReportUserClicked] = useState(false);
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
        <DropdownContainer>
          <Collapse isOpen={isCollapseScrollButton}>
            <CollapseButtonContainer style={{ boxShadow: "none" }}>
              <NewMessageAlertContainer
                onClick={() => {
                  scrollbarRef.current?.scrollToBottom();
                }}
              >
                새로운 메세지가 도착했습니다
              </NewMessageAlertContainer>
            </CollapseButtonContainer>
          </Collapse>
        </DropdownContainer>
        <DropdownContainer>
          <Collapse isOpen={isCollapse}>
            <CollapseButtonContainer>
              <CollapseButton onClick={() => SetIsLeaveRoomClicked(true)}>
                채팅방 나가기
              </CollapseButton>
              <CollapseButton onClick={() => SetIsBlockUserClicked(true)}>
                차단하기
              </CollapseButton>
              <CollapseButton onClick={() => SetIsReportUserClicked(true)}>
                신고하기
              </CollapseButton>
            </CollapseButtonContainer>
          </Collapse>
        </DropdownContainer>
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
      {(isLeaveRoomClicked || isBlockUserClicked || isReportUserClicked) && (
        <Modal
          isClose={
            !isLeaveRoomClicked && !isBlockUserClicked && !isReportUserClicked
          }
          onClose={() => {
            SetIsLeaveRoomClicked((prev) => !prev);
            SetIsBlockUserClicked((prev) => !prev);
            SetIsReportUserClicked((prev) => !prev);
          }}
        >
          <ReservationModalWrapper>
            {isLeaveRoomClicked && (
              <>
                <h1>채팅방에서 나가시겠어요?</h1>
                <span
                  style={{
                    color: "#8C94A4",
                    fontSize: "16px",
                    lineHeight: "24px",
                    padding: "0 10px",
                  }}
                >
                  나가시기를 하시면 나의 채팅방에서 상대방과 주고 받았던 대화가
                  모두 삭제됩니다. 상대방 채팅방에는 기록이남아있습니다.
                </span>
              </>
            )}
            {isBlockUserClicked && (
              <>
                <h1>{messages[0].username}을 차단하시겠어요?</h1>
                <span
                  style={{
                    color: "#8C94A4",
                    fontSize: "16px",
                    lineHeight: "24px",
                    padding: "0 10px",
                  }}
                >
                  차단된 상대방은 연고이팅에서 연고이팅에서 회원님의
                  프로필검색과 채팅 전송이 불가해지며 주고받은 채팅이
                  삭제됩니다.
                </span>
              </>
            )}
            {isReportUserClicked && (
              <>
                <h1>{messages[0].username}을 신고하시겠어요?</h1>
                <span
                  style={{
                    color: "#8C94A4",
                    fontSize: "16px",
                    lineHeight: "24px",
                    padding: "0 10px",
                  }}
                >
                  호로로로로로로로로로로
                </span>
              </>
            )}

            <MainBtn style={{ width: "90%" }}>취소하기</MainBtn>
            <CloseModalButton
              onClick={() => {
                SetIsLeaveRoomClicked(false);
                SetIsBlockUserClicked(false);
                SetIsReportUserClicked(false);
              }}
              className="userOptionBtn"
            >
              뒤로가기
            </CloseModalButton>
          </ReservationModalWrapper>
        </Modal>
      )}
    </SContainer>
  );
}

const CloseModalButton = styled.p`
  cursor: pointer;
  color: #8c94a4;
`;

const NewMessageAlertContainer = styled.div`
  width: 355px;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  opacity: 0.8;
  border-radius: 0 0 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

//position: "absolute", top: "100%", right: 10, zIndex: 100
const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 10px;
  z-index: 100;
`;

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
  width: 95%;
  margin-left: auto;
  margin-right: auto;
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
  z-index: 500;
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
