import { IRoom } from "./api/types";
import storage from "./storage";

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function parseHashTags(string): string {
  const parsedString: string[] = JSON.parse(string);
  return "#" + parsedString.join(" #");
}

export const SetLocalStorageItemWithMyRoom = (myRooms: IRoom[]) => {
  for (let myRoom of myRooms) {
    if (!storage.getItem(`chat-${myRoom.receiver.id}`)) {
      storage.setItem(`chat-${myRoom.receiver.id}`, myRoom.id);
    }
  }
};
