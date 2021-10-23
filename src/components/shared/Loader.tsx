import styled from "styled-components";

export const LoaderBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  opacity: 0.4;
  z-index: 900;
`;

export const LoaderWrapper = styled.div<{ top?: string }>`
  position: absolute;
  left: 50%;
  top: ${(props) => props.top || "40%"};
  transform: translate(-50%, -50%);
  z-index: 999;
`;
