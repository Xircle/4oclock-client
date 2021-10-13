import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import useSocket from "../../hooks/useSocket";
import { useParams } from "react-router-dom";

interface Props {}

// 디테일 채팅방 입니다.
export default function ChatPage(props: Props) {
  const { roomId = "fc88ebc3-1b06-418c-9dde-c81ffd4e36a3" } =
    useParams<{ roomId: string }>();
  const [msg, setMsg] = useState("");
  const [socket, disconnect] = useSocket(roomId);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    socket.emit("join_room", { roomId });
    socket.on("is_entering", isEnteringCallBack);
  }, []);

  const isEnteringCallBack = ({ flag }) => {
    setIsEntering(flag);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
    socket.emit("is_entering", {
      roomId,
      flag: e.currentTarget.value.trim().length > 0 ? true : false,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(msg);
    socket.emit("send_message", {
      roomId,
      content: msg,
    });
  };

  const onDisconnect = () => {
    disconnect();
    console.log(socket);
  };
  return (
    <div>
      <button onClick={onDisconnect}>채팅방 나가기</button>
      <div style={{ height: "50vh" }}></div>

      {isEntering && (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "skyblue",
          }}
        >
          입력중...
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input onChange={onChange} />
      </form>
    </div>
  );
}
