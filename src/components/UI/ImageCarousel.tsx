import styled from "styled-components";
import type { Review } from "../../lib/api/types";
import { PortalConsumer } from "../../providers/PortalProvider";
import { BACKDROP_Z_INDEX } from "../shared/constants";
import { Carousel } from "react-responsive-carousel";
import optimizeImage from "../../lib/optimizeImage";

interface Props {
  imageUrls?: string[];
}

export default function ImageCarousel({ imageUrls }: Props) {
  if (!imageUrls || imageUrls.length === 0) {
    return <></>;
  }
  return (
    <InnerContainer>
      <SCarousel
        infiniteLoop={true}
        useKeyboardArrows={true}
        emulateTouch={true}
        showStatus={false}
        dynamicHeight={true}
      >
        {imageUrls?.map((imageUrl, idx) => (
          <Picture key={idx} src={optimizeImage(imageUrl)} />
        ))}
      </SCarousel>
    </InnerContainer>
  );
}

const SCarousel = styled(Carousel)`
  width: 100%;
  object-fit: cover;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
`;

const Picture = styled.img`
  object-fit: contain;
`;
