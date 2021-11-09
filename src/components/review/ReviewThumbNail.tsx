import styled from "styled-components";
import type { Review } from "../../lib/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import optimizeImage from "../../lib/optimizeImage";

interface Props extends Review {
  onClick: () => void;
}

export default function ReviewThumbNail({
  imageUrls,
  description,
  onClick,
}: Props) {
  const empty = imageUrls.length === 0;
  const many = imageUrls.length > 1;

  return (
    <Container empty={empty} onClick={() => onClick()}>
      {!empty && <GridImg src={optimizeImage(imageUrls[0])} />}
      {many && (
        <FontAwesomeIcon
          icon={faClone}
          color={"white"}
          size={"xs"}
          style={{ position: "absolute", right: "3px", top: "3px" }}
        />
      )}
    </Container>
  );
}

const Container = styled.div<{ empty: boolean }>`
  position: relative;
  width: 123px;
  height: 123px;
  background-color: ${(props) => (props.empty ? "#f8fafd" : "transparent")};
  cursor: pointer;
`;

const GridImg = styled.img`
  width: 123px;
  height: 123px;
  object-fit: cover;
  cursor: pointer;
  position: relative;
`;
