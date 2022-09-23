import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useRef, useState } from "react";
import styled from "styled-components";
import { colors, Container } from "../../../styles/styles";

function V2LandingPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <SContainer>
      <Header>
        <HeaderItem
          onClick={() => {
            setDrawerOpened(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} color={colors.Black} size="2x" />
        </HeaderItem>
        <HeaderItem>로그인</HeaderItem>
      </Header>
      <Body>
        <HeaderItem>로그인</HeaderItem>
        <HeaderItem>로그인</HeaderItem>
        <HeaderItem>로그인</HeaderItem>
        <HeaderItem>로그인</HeaderItem>
      </Body>
      <Drawer open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <DrawerItem>내 지원서 보기</DrawerItem>
        <DrawerItem>인스타 후기보기</DrawerItem>
        <DrawerItem>문의하기</DrawerItem>
      </Drawer>
    </SContainer>
  );
}

const SContainer = styled(Container)`
  min-height: 100vh;
`;

const Body = styled.div`
  min-height: 300vh;
`;

const DrawerItem = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  position: sticky;
  width: 375px;
  height: 80px;
  background-color: ${colors.LightGray};
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  top: 0px;
`;

const HeaderItem = styled.div`
  align-self: center;
  cursor: pointer;
`;

export default V2LandingPage;
