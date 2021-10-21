import { CURRENT_USER } from "./../components/shared/constants";
import { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import storage from "../lib/storage";

// http://localhost:3080
// process.env.REACT_APP_TEST_API_SERVER
const socketServerUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_TEST_API_SERVER
    : "http://localhost:3080";

const existingSockets: { [key: string]: Socket } = {};

export type UseSocketOutput = [Socket, () => void];

export const useSocket = (roomId: string): UseSocketOutput => {
  const disconnect = useCallback(() => {
    if (existingSockets[roomId]) {
      existingSockets[roomId].disconnect();
      delete existingSockets[roomId];
    }
  }, [roomId]);

  if (!existingSockets[roomId]) {
    existingSockets[roomId] = io(`${socketServerUrl}/chat`, {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        authorization: `Bearer ${storage.getItem(CURRENT_USER)?.token || ""}`,
      },
    });
    console.info("create socket", roomId, existingSockets[roomId]);
  }

  return [existingSockets[roomId], disconnect];
};
