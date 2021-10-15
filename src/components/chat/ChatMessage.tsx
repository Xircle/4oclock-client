import styled from "styled-components";
import { IMessage } from "../../lib/api/types";
import { ConvertSentTime } from "../../lib/utils";
import moment from "moment";

interface Props extends IMessage {}

export default function ChatMessage({ isMe, isRead, content }: Props) {
  const tempDate = new Date("2021-10-14T03:24:00");
  return (
    <Container isMe={isMe}>
      <MessageContainer isMe={isMe}>{content}</MessageContainer>
      <TimeText>{ConvertSentTime(tempDate)}</TimeText>
    </Container>
  );
}

const TimeText = styled.div`
  color: #a7b0c0;
  font-size: 13px;
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
