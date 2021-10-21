import { IMessage } from "./api/types";
import moment from "moment";
import "moment/locale/ko";

export default function makeSection<T extends IMessage>(messages: T[]) {
  const sections: { [key: string]: T[] } = {};
  messages.forEach((message) => {
    const monthDate = moment(message.sentAt).format("YYYY-MM-DD");
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(message);
    } else {
      sections[monthDate] = [message];
    }
  });
  return sections;
}
