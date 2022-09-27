import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CURRENT_USER } from "../../../components/shared/constants";
import storage from "../../../lib/storage";
import routes from "../../../routes";
import { colors, HeaderItem, V2Header } from "../../../styles/styles";

interface Props {
  title?: string;
}

export default function V2HeaderC({ title }: Props) {
  const history = useHistory();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (storage.getItem(CURRENT_USER)?.token) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  const loginOnClick = () => {
    if (!isLoggedin) {
      history.push(routes.v2Login);
    } else {
      history.push(routes.v2MyPage);
    }
  };

  const goToHome = () => {
    history.push(routes.v2Root);
    setDrawerOpened(false);
  };

  return (
    <>
      <V2Header>
        <HeaderItem
          onClick={() => {
            setDrawerOpened(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} color={colors.Black} size="2x" />
        </HeaderItem>
        {title && <TitleDiv>{title}</TitleDiv>}
        <HeaderItem onClick={loginOnClick}>
          {isLoggedin ? storage.getItem(CURRENT_USER).username : "로그인"}
        </HeaderItem>
      </V2Header>
      <Drawer open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <DrawerItem>드로어 1</DrawerItem>
        <DrawerItem>드로어 2</DrawerItem>
        <DrawerItem>드로어 2</DrawerItem>
        <DrawerItem onClick={goToHome}>홈으로 가기</DrawerItem>
      </Drawer>
    </>
  );
}

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 22px;
  align-self: center;
`;

const DrawerItem = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  cursor: pointer;
`;
