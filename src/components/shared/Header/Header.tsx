import styled from "styled-components";
import HeaderPic from "./HeaderPic";

interface Props {
  children: React.ReactNode;
  src: string;
}

const SHeader = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderText = styled.div`
  color: white;
  position: absolute;
  bottom: 8%;
  left: 3%;
  width: 65%;
`;

export default function Header(props: Props) {
  return (
    <SHeader>
      <HeaderPic
        src={props.src}

      />
      <HeaderText>{props.children}</HeaderText>
    </SHeader>
  );
}
