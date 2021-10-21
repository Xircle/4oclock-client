import styled from "styled-components";
import { IMessage } from "../../lib/api/types";
import { ConvertSentTime } from "../../lib/utils";

interface Props extends IMessage {
  isEntering?: boolean;
}

export default function ChatMessage({
  isEntering,
  isMe,
  sentAt,
  isRead,
  content,
}: Props) {
  return (
    <Container isMe={isMe}>
      <MessageContainer isMe={isMe}>{content}</MessageContainer>
      {!isEntering && (
        <IndicatorContainer isMe={isMe}>
          <ReadIndicator isRead={isRead!}>1</ReadIndicator>
          {sentAt && (
            <TimeText>
              <span>{ConvertSentTime(sentAt)}</span>
            </TimeText>
          )}
        </IndicatorContainer>
      )}
    </Container>
  );
}

const IndicatorContainer = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
`;
const ReadIndicator = styled.span<{ isRead: boolean }>`
  color: #1fa1ff;
  font-size: 12px;
  margin: 0 5px;
  opacity: ${(props) => (props.isRead ? 0 : 1)};
`;

const TimeText = styled.div`
  display: flex;
  span {
    color: #a7b0c0;
    font-size: 12px;
    text-align: end;
    align-self: flex-end;
    margin: 0 5px;
  }
`;

const MessageContainer = styled.div<{ isMe?: boolean }>`
  max-width: 60%;
  padding: 10px;
  border-radius: ${(props) =>
    props.isMe ? "25px 0 25px 25px" : "25px 25px 25px 0"};
  background-color: ${(props) => (props.isMe ? "#1FA1FF" : "#F8FAFD")};
  color: ${(props) => (props.isMe ? "white" : "black")};
  font-size: 14px;
  line-height: 20px;
`;

const Container = styled.div<{ isMe?: boolean }>`
  width: 100%;
  padding: 5px 0px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${(props) => (props.isMe ? "row-reverse" : "row")};
`;
