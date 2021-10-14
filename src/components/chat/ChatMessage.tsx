import styled from "styled-components";
import { IMessage } from "../../lib/api/types";

interface Props extends IMessage {}

export default function ChatMessage({ isMe, isRead, content }: Props) {
  return (
    <Container isMe={isMe}>
      <MessageContainer isMe={isMe}>{content}</MessageContainer>
    </Container>
  );
}

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
