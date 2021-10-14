export interface Message {
  userId: number;
  username: string;
  avatar: string;
  message: string;
  sentTime?: string;
}
export interface Room extends Message {
  unread: boolean;
}

export const chatMessageDummies: Message[] = [
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "초면에 실례가 심하시네요. 그럼 님 티어는요?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "그래서 님 티어가..?",
  },
  {
    userId: 1,
    username: "유저2",
    avatar: "/avatar/Avartar002.jpeg",
    message: "반가워요",
  },
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message: "안녕하세요",
  },
];

export const chatListDummies: Room[] = [
  {
    userId: 0,
    username: "유저1",
    avatar: "/avatar/Avartar001.jpeg",
    message:
      "초면에 실례가 심하시네요.dfdfdfdfdfdfdfdfdfdfdfdfdfsdfadsfadfadsf",
    unread: true,
    sentTime: "2021-10-14 00:00:00",
  },
  {
    userId: 1,
    username: "Junnnnnn",
    avatar: "/avatar/Avartar002.jpeg",
    message: "초면에 실례가 심하시네요.",
    unread: true,
    sentTime: "2021-10-12 22:15:00",
  },
  {
    userId: 2,
    username: "유저3",
    avatar: "/avatar/Avartar003.jpeg",
    message: "초면에 실례가 심하시네요.",
    unread: false,
    sentTime: "2021-08-10 11:00:00",
  },
  {
    userId: 3,
    username: "sdfsdfsdf",
    avatar: "/avatar/Avartar004.jpeg",
    message: "초면에 실례가 심하시네요.",
    unread: false,
    sentTime: "2021-9-51 15:08:11",
  },
];
