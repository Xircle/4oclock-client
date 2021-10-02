import styled from "styled-components";
import { useEffect } from "react";

interface Props {}

export default function ChatPage(props: Props) {
  // should be modified later with correct useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div></div>;
}
