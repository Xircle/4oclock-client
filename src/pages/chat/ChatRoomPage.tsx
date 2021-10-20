import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { Container, colors, Avartar, MainBtn } from "../../styles/styles";
import ClipLoader from "react-spinners/ClipLoader";
import { RouteComponentProps } from "react-router-dom";
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
import { Collapse } from "reactstrap";
import Modal from "../../components/UI/Modal";
import { ReservationModalWrapper } from "../reservation/ReservationPage";
import useSocket from "../../hooks/useSocket";
import { IMessage } from "../../lib/api/types";
import { useMutation, useQuery } from "react-query";
import { getRoomMessages } from "../../lib/api/getRoomMessages";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import storage from "../../lib/storage";
import { CURRENT_USER } from "../../components/shared/constants";
import { useCallback } from "react";
import { sendMessage } from "../../lib/api/sendMessage";
import { toast } from "react-toastify";
import { IsMessageDividor, SetMessageDividorText } from "../../lib/utils";

interface Props
  extends RouteComponentProps<
    { roomId: string },
    {},
    {
      id: string;
      profileImageUrl: string;
      username: string;
    }
  > {}

export default function ChatRoomPage({ match, history, location }: Props) {
  const scrollbarRef = useRef<Scrollbars>(null);
  useEffect(() => {
    scrollbarRef.current?.scrollTop(5000000000);
  }, [scrollbarRef]);

  const { roomId } = match.params;
  const [socket, disconnect] = useSocket(roomId);
  const isEnteringCallBack = ({ flag }) => {
    setIsEntering(flag);
  };
  useEffect(() => {
    const anonymouseId = storage.getItem(CURRENT_USER)?.uid;
    if (!roomId || !anonymouseId) return;
    socket.emit("join_room", { roomId, anonymouseId });
    socket.on("is_entering", isEnteringCallBack);
    socket.on("receive_message", receivedMsgFromSocket);
  }, [roomId]);

  const {
    id: receiverId,
    profileImageUrl: receiverProfileImageUrl,
    username: receiverUsername,
  } = location.state;

  const [messages, SetMessages] = useState<IMessage[]>([]);
  const [messageInput, SetMessageInput] = useState("");
  const [isCollapse, SetIsCollapse] = useState(false);
  const [isCollapseScrollButton, SetIsCollapseScrollButton] = useState(false);
  const [isFirstRefresh, SetIsFirstRefresh] = useState(true);
  const [isLeaveRoomClicked, SetIsLeaveRoomClicked] = useState(false);
  const [isBlockUserClicked, SetIsBlockUserClicked] = useState(false);
  const [isReportUserClicked, SetIsReportUserClicked] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [loadOldMessages, SetLoadOldMessages] = useState(false);

  const { data: fetchedMessages, isLoading } = useQuery<IMessage[] | undefined>(
    ["room-chat", roomId],
    () => getRoomMessages(roomId, receiverId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync: mutateMessage } = useMutation(sendMessage);

  useEffect(() => {
    if (!fetchedMessages) return;
    SetMessages(fetchedMessages);
  }, [fetchedMessages]);

  // 소켓으로부터 받은 메세지 콜백
  const receivedMsgFromSocket = useCallback(
    ({ content, sentAt }) => {
      SetMessages((prev) => {
        const messages = [
          { content, isMe: false, sentAt, isRead: true },
          ...prev,
        ];
        console.log(messages);
        return messages;
      });
    },
    [messages]
  );

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetMessageInput(e.target.value);
    socket.emit("is_entering", {
      roomId,
      anonymouseId: storage.getItem(CURRENT_USER)?.uid,
      flag: e.currentTarget.value.trim().length > 0 ? true : false,
    });
  };

  const onSubmitHandler = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // 로컬 message state 에 동기화
    SetMessages((prev) => {
      const messages = [
        {
          content: messageInput,
          isMe: true,
          sentAt: new Date(),
          isRead: false,
        },
        ...prev,
      ];
      return messages;
    });
    // POST 비동기로 요청
    mutateMessage({
      content: messageInput,
      receiverId: receiverId,
      roomId,
    }).then((res) => {
      if (!res.data.ok) {
        console.log(res);
        toast.error("전송에 실패했습니다. 잠시 후 다시 시도해주세요");
        // 전송에 실패했으므로, 로컬의 message의 말풍선에 X 추가한다.
      }
    });
    // socket emit
    socket.emit("send_message", {
      roomId,
      anonymouseId: storage.getItem(CURRENT_USER)?.uid,
      content: messageInput,
    });
    socket.emit("is_entering", {
      roomId,
      anonymouseId: storage.getItem(CURRENT_USER)?.uid,
      flag: false,
    });
    SetMessageInput("");
  };

  if (isLoading)
    return (
      <>
        <LoaderBackdrop />
        <LoaderWrapper>
          <ClipLoader
            loading={isLoading}
            color={colors.MidBlue}
            css={{
              name: "width",
              styles: "border-width: 4px; z-index: 999;",
            }}
            size={30}
          />
        </LoaderWrapper>
      </>
    );

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
          <SAvartar src={receiverProfileImageUrl} />
          <CounterPartName>{receiverUsername}</CounterPartName>
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
          if (values.top < 0.3) {
            SetLoadOldMessages(true);
          }
        }}
      >
        <MessageContainer>
          {isEntering && (
            <ChatMessage content="....." isMe={false}></ChatMessage>
          )}
          {messages?.map((message, index) => (
            <Fragment key={index}>
              {IsMessageDividor(
                new Date("1995-12-17T03:24:00"),
                new Date("1996-05-17T03:24:00")
              ) && (
                <MessageDividor>
                  {SetMessageDividorText(new Date("1995-12-17T03:24:00"))}
                </MessageDividor>
              )}
              <ChatMessage {...message} />
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
        <form onSubmit={onSubmitHandler}>
          <SInput
            placeholder="메세지를 입력해주세요"
            value={messageInput}
            name="MessageInput"
            onChange={handleMessageInputChange}
          />
          <SendButton type="submit" onClick={onSubmitHandler}>
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
                <h1>{receiverUsername}을 차단하시겠어요?</h1>
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
                <h1>{receiverUsername}을 신고하시겠어요?</h1>
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

const MessageDividor = styled.div`
  text-align: center;
  width: 100%;
  color: #a7b0c0;
  font-size: 13px;
  margin: 5px 0;
`;

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
