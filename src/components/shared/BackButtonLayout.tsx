import React from "react";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function BackButtonLayout({ children }: Props) {
  const history = useHistory();
  return (
    <>
      <BackButtonContainer>
        <BackButtonWrapper>
          <SFontAwesomeIcon
            onClick={() => history.goBack()}
            icon={faArrowLeft}
            size="1x"
            color="black"
          />
        </BackButtonWrapper>
      </BackButtonContainer>
      {children}
    </>
  );
}

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const BackButtonContainer = styled.div`
  width: 100%;
  height: 44px;
  background-color: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

const BackButtonWrapper = styled.div`
  padding: 0 20px;
`;
