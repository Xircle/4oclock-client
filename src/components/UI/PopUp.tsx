import styled, { keyframes } from "styled-components";
import { PortalConsumer } from "../../providers/PortalProvider";
import { BACKDROP_Z_INDEX } from "../shared/constants";

interface Props {
  children: React.ReactNode;
  isClose: boolean;
  onClose?: () => void;
}

export default function PopUp({ children, isClose, onClose }: Props) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <PortalConsumer>
      {/* <ModalContainer close={isClose} onClick={onClose}>
        <ModalWrapper onClick={clickHandler} close={isClose}></ModalWrapper>
      </ModalContainer> */}
      <PopUpContainer close={false}>
        <PopUpWrapper>{children}</PopUpWrapper>
      </PopUpContainer>
    </PortalConsumer>
  );
}

const blur = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const up = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0%);
    }
`;

const PopUpContainer = styled.div<{ close: boolean }>`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  transition: opacity 0.1s;
  opacity: ${(props) => (props.close ? 0.5 : 1)};
  animation: ${blur} 0.1s;
  z-index: ${(props) =>
    props.close ? -Number(BACKDROP_Z_INDEX) : Number(BACKDROP_Z_INDEX)};
`;

const PopUpWrapper = styled.div`
  position: relative;
  width: 320px;
  animation: ${up} 150ms linear;
  top: 0px;
  height: 490px;
  background: #000;
`;
