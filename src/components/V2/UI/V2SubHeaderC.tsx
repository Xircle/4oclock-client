import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

interface Props {
  title?: string;
}

export default function V2SubHeaderC({ title }: Props) {
  const history = useHistory();
  return (
    <Header>
      <SFontAwesomeIcon
        onClick={() => history.goBack()}
        icon={faArrowLeft}
        size="lg"
        color="black"
      />
      <HeaderText>{title}</HeaderText>
    </Header>
  );
}

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  left: 5px;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 20px;
`;
