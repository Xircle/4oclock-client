import styled from 'styled-components';
import type { Review } from '../../lib/api/types';
import { PortalConsumer } from '../../providers/PortalProvider';
import { BACKDROP_Z_INDEX } from '../shared/constants';
import { Carousel } from 'react-responsive-carousel';
import optimizeImage from '../../lib/optimizeImage';

interface Props extends Review {
  children: React.ReactNode | React.ReactNode[];
  onClick: () => void;
}

export default function ReviewCarousel(props: Props) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <PortalConsumer>
      <CarouselContainer
        data-value="parent"
        close={false}
        onClick={(event: React.MouseEvent) => {
          if (
            (event.target as HTMLElement).getAttribute('data-value') ===
            'parent'
          ) {
            props.onClick();
          }
        }}
      >
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
              <ReviewPicture
                key={idx}
                src={optimizeImage(imageUrl, {
                  width: 400,
                  height: 300,
                  quality: 100,
                })}
              />
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
  right: 20px;
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
  max-width: 400px;
  max-height: 400px;
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
