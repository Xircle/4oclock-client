import styled from "styled-components";
import { Message } from "./dummies/ChatDummies";
import { colors } from "../../styles/styles";

interface Props extends Message {}

export default function ChatMessage(props: Props) {
  return (
    <Container me={props.userId === 0}>
      <MessageContainer me={props.userId === 0}>
        {props.message}
      </MessageContainer>
    </Container>
  );
}

const MessageContainer = styled.div<{ me?: boolean }>`
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.me ? "#1FA1FF" : "#F8FAFD")};
  color: ${(props) => (props.me ? "white" : "black")};
  font-size: 14px;
  line-height: 20px;
`;

const Container = styled.div<{ me?: boolean }>`
  width: 100%;
  padding: 5px 0px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: ${(props) => (props.me ? "row-reverse" : "row")};
`;
