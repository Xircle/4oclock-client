import styled from "styled-components";
import type { Review } from "../../lib/api/types";
import { PortalConsumer } from "../../providers/PortalProvider";
import { BACKDROP_Z_INDEX } from "../shared/constants";
import { Carousel } from "react-responsive-carousel";

interface Props extends Review {
  children: React.ReactNode | React.ReactNode[];
}

export default function ReviewCarousel(props: Props) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <PortalConsumer>
      <CarouselContainer close={false}>
        <CloseButton>{props.children}</CloseButton>
        <InnerContainer>
          <SCarousel
            infiniteLoop={true}
            useKeyboardArrows={true}
            emulateTouch={true}
            showStatus={false}
            dynamicHeight={true}
          >
            {props.imageUrls?.map((imageUrl, idx) => (
              <ReviewPicture key={idx} src={imageUrl} />
            ))}
          </SCarousel>
          <ReviewDescription>{props.description}</ReviewDescription>
        </InnerContainer>
      </CarouselContainer>
    </PortalConsumer>
  );
}

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  cursor: pointer;
`;

const SCarousel = styled(Carousel)`
  width: 100%;
  object-fit: cover;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

const ReviewPicture = styled.img``;

const ReviewDescription = styled.p`
  color: white;
  position: absolute;
  width: 100%;
  left: 5;
  bottom: 0;
  font-size: 22px;
`;

const CarouselContainer = styled.div<{ close: boolean }>`
  position: relative;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  transition: opacity 0.1s;
  /* opacity: ${(props) => (props.close ? 0.5 : 1)}; */
  z-index: ${(props) =>
    props.close ? -Number(BACKDROP_Z_INDEX) : Number(BACKDROP_Z_INDEX)};
`;