import styled from "styled-components";
import PageTitle from "../../../components/PageTitle";
import { Container, colors, Avartar } from "../../../styles/styles";
import ClipLoader from "react-spinners/ClipLoader";
import { RouteComponentProps } from "react-router-dom";
import {
  faArrowLeft,
  faArrowUp,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatMessage from "../../../components/chat/ChatMessage";
import React, { useEffect, useRef, useState } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars-2";
import { Collapse } from "reactstrap";
import { useSocket } from "../../../hooks/useSocket";
import { GetRoomMessagesOutput, IMessage } from "../../../lib/api/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRoomMessages } from "../../../lib/api/getRoomMessages";
import { LoaderWrapper } from "../../../components/shared/Loader";
import storage from "../../../lib/storage";
import { CURRENT_USER } from "../../../components/shared/constants";
import { useCallback } from "react";
import { sendMessage } from "../../../lib/api/sendMessage";
import { toast } from "react-toastify";
import routes from "../../../routes";
import { use100vh } from "react-div-100vh";
import optimizeImage from "../../../lib/optimizeImage";

interface Props
  extends RouteComponentProps<
    { roomId: string },
    {},
    {
      receiverId: string;
      profileImageUrl: string;
      username: string;
    }
  > {}
export const CHAT_NUMBER_PER_PAGE = 40;
const ANNONYMOUSE_USERID = storage.getItem(CURRENT_USER)?.uid;
export default function ChatRoomPage({ match, history, location }: Props) {
  const [isLastMe, SetIsLastMe] = useState(false);
  const iOS = require("is-ios");
  const isUse100Vh = use100vh();
  const containerHeight = isUse100Vh ? isUse100Vh : "100vh";
  const scrollbarRef = useRef<Scrollbars>(null);
  const MessageInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { roomId } = match.params;
  const {
    receiverId,
    profileImageUrl: receiverProfileImageUrl,
    username: receiverUsername,
  } = location.state;

  useEffect(() => {
    // 토큰 검사
    if (!roomId || !storage.getItem(CURRENT_USER)?.uid) {
      // 토큰이 없으면
      alert("로그인 후 이용해주세요!");
      window.location.href = routes.root;
    }
    return () => {
      socket.emit("leave_room", { roomId });
      disconnect();
    };
  }, []);

  useEffect(() => {
    // 로컬스토리지 체크
    const existingRoomId = storage.getItem(`chat-${receiverId}`);
    if (roomId === "0" && existingRoomId) {
      history.replace(`/chatRoom/${existingRoomId}`, {
        receiverId,
        profileImageUrl: receiverProfileImageUrl,
        username: receiverUsername,
      });
    }
  }, []);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, SetMessageInput] = useState("");
  const [isCollapse, SetIsCollapse] = useState(false);
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);
  // const [isLeaveRoomClicked, SetIsLeaveRoomClicked] = useState(false);
  // const [isBlockUserClicked, SetIsBlockUserClicked] = useState(false);
  // const [isReportUserClicked, SetIsReportUserClicked] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [page, setPage] = useState(1);
  const [isReceiverJoining, setIsReceiverJoining] = useState(false);
  const [socket, disconnect] = useSocket(
    storage.getItem(`chat-${receiverId}`) || "",
  );
  const { data: fetchedMessagesData, isFetching } = useQuery<
    GetRoomMessagesOutput | undefined
  >(
    ["room-chat", roomId, page],
    () => getRoomMessages(roomId, receiverId, page, 40),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    if (page === 1) scrollbarRef.current?.scrollToBottom(); // 맨 밑으로 스크롤
  }, [messages, page, scrollbarRef.current]);

  useEffect(() => {
    // 마운트 후, 모든 소켓 연결
    if (roomId === "0" && !storage.getItem(`chat-${receiverId}`)) return;

    socket.emit("join_room", { roomId, anonymouseId: ANNONYMOUSE_USERID });
    // socket.on("join_room", receiverJoinRoomHandler);
    socket.on("leave_room", () => setIsReceiverJoining(false));
    socket.on("is_entering", isEnteringCallBack);
    socket.on("receive_message", receivedMsgFromSocket);
    return () => {
      socket.off("is_entering", isEnteringCallBack);
      socket.off("receive_message", receivedMsgFromSocket);
      // socket.off("join_room", receiverJoinRoomHandler);
      socket.off("leave_room", () => setIsReceiverJoining(false));
    };
  }, [roomId, receiverId]);

  // 상대방이 방에 참여했을 때
  // const receiverJoinRoomHandler = useCallback(
  //   (data: { joinedUserId: string }) => {
  //     setIsReceiverJoining(true);
  //     setMessages((oldMessages) => {
  //       return oldMessages.map((msg) => ({
  //         ...msg,
  //         isRead: true,
  //       }));
  //     });
  //   },
  //   []
  // );

  const { mutateAsync: mutateMessage } = useMutation(sendMessage);

  useEffect(() => {
    if (!fetchedMessagesData?.messages) return;

    if (page === 1) {
      setMessages(fetchedMessagesData?.messages);
    } else if (page > 1 && !isFetching) {
      // pagination 시에 이전 데이터와 함께 보여주기 위해서 prev 사용
      setMessages((prev) => [...prev, ...fetchedMessagesData?.messages]);
    }
  }, [page, fetchedMessagesData, isFetching]);

  useEffect(() => {
    // 만약 hasMore이면 미리 캐싱해놓는다.
    if (fetchedMessagesData?.meta?.hasMore) {
      console.log("prefetch!");
      queryClient.prefetchQuery(["room-chat", roomId, page + 1], () =>
        getRoomMessages(roomId, receiverId, page + 1),
      );
    }
  }, [fetchedMessagesData, queryClient, roomId, receiverId, page]);

  const isEnteringCallBack = ({ flag }) => {
    setIsEntering(flag);
  };

  const showNewMessageAlertHandler = (top: number) => {
    const threshold = 0.7;
    if (top < threshold) {
      setShowNewMessageAlert(true);
    }
    if (iOS) {
      scrollbarRef.current?.scrollToBottom();
      SetIsLastMe(false);
    }
  };

  const onScrollFram = (values: positionValues) => {
    if (values.top <= 0.4) {
      if (!isFetching && messages.length >= CHAT_NUMBER_PER_PAGE * page) {
        console.log("axios 요청!");
        setPage((old) => old + 1);
      }
    }
  };

  // 소켓으로부터 받은 메세지 콜백
  const receivedMsgFromSocket = useCallback(
    ({ content, sentAt }) => {
      if (!scrollbarRef?.current) return;
      showNewMessageAlertHandler(scrollbarRef.current.getValues().top);
      setMessages((prev) => {
        // isRead: true
        return [{ content, isMe: false, sentAt }, ...prev];
      });
    },
    [messages],
  );

  const handleMessageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      SetMessageInput(e.target.value);
      socket.emit("is_entering", {
        roomId,
        anonymouseId: storage.getItem(CURRENT_USER)?.uid,
        flag: e.currentTarget.value.trim().length > 0 ? true : false,
      });
    },
    [socket, roomId],
  );

  const onSubmitHandler = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
      e.preventDefault();
      if (messageInput.trim().length === 0) return;
      SetMessageInput("");
      SetIsLastMe(true);
      MessageInputRef.current?.focus();
      scrollbarRef.current?.scrollToBottom();
      // 로컬 message state 에 동기화
      setMessages((prev) => {
        const messages = [
          {
            content: messageInput,
            isMe: true,
            sentAt: new Date(),
            // isRead: isReceiverJoining ? true : false,
          },
          ...prev,
        ];
        return messages;
      });
      // POST 비동기로 요청
      mutateMessage({
        content: messageInput,
        receiverId: receiverId,
        roomId: storage.getItem(`chat-${receiverId}`) || roomId,
        // isRead: isReceiverJoining,
      }).then((res) => {
        if (!res.data.ok) {
          toast.error("전송에 실패했습니다. 잠시 후 다시 시도해주세요");
          // 전송에 실패했으므로, 로컬의 message의 말풍선에 X 추가한다.
          return;
        }
        if (roomId === "0" && res.data.createdRoomId) {
          // 만약 unmount되었을 때 이 promise는 실행이 될까?
          storage.setItem(`chat-${receiverId}`, res.data.createdRoomId);
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
    },
    [MessageInputRef, messageInput, receiverId, roomId, socket, mutateMessage],
  );

  const exitRoomHandler = useCallback(() => {
    socket.emit("leave_room", { roomId });
    history.goBack();
  }, [socket, roomId]);

  return (
    <SContainer style={{ height: containerHeight }}>
      <PageTitle title="채팅" />

      {isFetching && page === 1 && (
        <LoaderWrapper>
          <ClipLoader
            loading={true}
            color={colors.MidBlue}
            css={{
              name: "width",
              styles: "border-width: 4px; opacity: 0.4; z-index: 999;",
            }}
            size={30}
          />
        </LoaderWrapper>
      )}
      {/* Header */}
      <Header>
        <LeftHeaderContainer>
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
            icon={faArrowLeft}
            color={colors.Black}
            size="lg"
            onClick={exitRoomHandler}
          />
          <SAvartar
            src={optimizeImage(receiverProfileImageUrl, {
              width: 40,
              height: 40,
            })}
            onClick={() =>
              history.push(routes.userProfile + "?cameFromChat=true", {
                receiverId,
                profileImageUrl: receiverProfileImageUrl,
                username: receiverUsername,
              })
            }
          />
          <CounterPartName>{receiverUsername}</CounterPartName>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
            icon={faEllipsisV}
            color={colors.Black}
            size="lg"
            // onClick={() => SetIsCollapse(!isCollapse)}
          />
        </RightHeaderContainer>
        <DropdownContainer>
          <Collapse isOpen={showNewMessageAlert}>
            <CollapseButtonContainer style={{ boxShadow: "none" }}>
              <NewMessageAlertContainer
                onClick={() => {
                  setShowNewMessageAlert(false);
                  scrollbarRef.current?.scrollToBottom();
                }}
              >
                새로운 메세지가 도착했습니다
              </NewMessageAlertContainer>
            </CollapseButtonContainer>
          </Collapse>
        </DropdownContainer>
        <DropdownContainer>
          {/* <Collapse isOpen={isCollapse}>
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
          </Collapse> */}
        </DropdownContainer>
      </Header>

      <SScrollbars
        ref={scrollbarRef}
        autoHide={true}
        onScrollFrame={onScrollFram}
      >
        <MessageContainer>
          {iOS && isLastMe && <div style={{ height: "100px" }}></div>}
          {isEntering && (
            <ChatMessage
              isEntering={isEntering}
              content="....."
              isMe={false}
            ></ChatMessage>
          )}
          {messages.map((message, index) => {
            return (
              <React.Fragment key={index}>
                {/* {index > 0 && } */}
                <ChatMessage {...message} />
              </React.Fragment>
            );
          })}
          {isFetching && page !== 1 && (
            <ChatLoadingWrapper>
              <ClipLoader
                loading={true}
                color={colors.MidBlue}
                css={{
                  name: "width",
                  styles: "border-width: 4px; z-index: 999;",
                }}
                size={30}
              />
            </ChatLoadingWrapper>
          )}
        </MessageContainer>
      </SScrollbars>

      <InputContainer>
        <form onSubmit={onSubmitHandler}>
          <SInput
            placeholder="메세지를 입력해주세요"
            ref={MessageInputRef}
            value={messageInput}
            name="MessageInput"
            onChange={handleMessageInputChange}
          />
          <SendButton
            type="submit"
            disabled={messageInput.trim().length === 0}
            onClick={onSubmitHandler}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faArrowUp}
              color="white"
              size="lg"
            />
          </SendButton>
        </form>
      </InputContainer>
      {/* {(isLeaveRoomClicked || isBlockUserClicked || isReportUserClicked) && (
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
      )} */}
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
  cursor: pointer;
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
  &:disabled {
    background-color: ${colors.LightGray};
  }
`;

const SInput = styled.input`
  padding: 0 10px;
  padding-right: 80px;
  font-size: 17px;
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
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
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
  margin: 10px auto 0px;
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

const ChatLoadingWrapper = styled(LoaderWrapper)`
  top: 20px;
`;
