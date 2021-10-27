import styled from "styled-components";
import type { Review } from "../../lib/api/types";
import { PortalConsumer } from "../../providers/PortalProvider";
import { BACKDROP_Z_INDEX } from "../shared/constants";

interface Props extends Review {}

export default function ReviewCarousel(props: Props) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return <div></div>;
}
