import { CURRENT_USER } from "./../components/shared/constants";
import { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import storage from "../lib/storage";

const socketServerUrl = "https://xircle-test-server.herokuapp.com";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_SERVER
    : process.env.REACT_APP_API_SERVER;

const existingSockets: { [key: string]: Socket } = {};
const useSocket = (room: string): [Socket, () => void] => {
  const disconnect = useCallback(() => {
    if (room && existingSockets[room]) {
      existingSockets[room].disconnect();
      delete existingSockets[room];
    }
  }, [room]);

  if (!existingSockets[room]) {
    existingSockets[room] = io(`${socketServerUrl}/chat`, {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        authorization: `Bearer ${storage.getItem(CURRENT_USER)?.token || ""}`,
      },
    });
    console.info("create socket", room, existingSockets[room]);
  }

  return [existingSockets[room], disconnect];
};

export default useSocket;
