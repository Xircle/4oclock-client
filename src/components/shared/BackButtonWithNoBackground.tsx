import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/styles";

interface Props {
  onPrev: () => void;
}

export default function BackButtonWithNoBackground({ onPrev }: Props) {
  return (
    <div
      style={{
        fontSize: "12px",
        margin: "2rem 1.5rem 1rem",
      }}
    >
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        icon={faArrowLeft}
        color={colors.Black}
        size="2x"
        onClick={onPrev}
      />
    </div>
  );
}
