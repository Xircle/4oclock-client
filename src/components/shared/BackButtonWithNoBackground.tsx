import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles";

interface Props {
  onPrev: () => void;
}

export default function BackButtonWithNoBackground({ onPrev, ...props }: Props) {

  return (
    <div style={{ fontSize: "12px", marginTop: "50px", marginLeft: "20px" }}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        color={colors.Black}
        size="2x"
        onClick={onPrev}
      />
    </div>
  );
}
