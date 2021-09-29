import styled from "styled-components";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import routes from "../routes";

interface Props
  extends RouteComponentProps<
    { index: string },
    {},
    { profileImageUrls: string[] }
  > {}

export default function ImageGalleryPage({ match, history, location }: Props) {
  const { index = 0 } = match.params;
  const { profileImageUrls } = location.state;

  if (!profileImageUrls[0]) {
    history.goBack();
  }
  const images: ReactImageGalleryItem[] = profileImageUrls.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  const HistoryPop = () => {
    history.goBack();
  };

  return (
    <Container onClick={() => HistoryPop()}>
      <Wrapper
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <ImageGallery
          items={images}
          startIndex={+index}
          showIndex={true}
          showBullets={true}
          infinite={true}
          showThumbnails={false}
          showNav={true}
          showPlayButton={false}
          showFullscreenButton={false}
          slideDuration={450}
          slideOnThumbnailOver={false}
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .image-gallery-bullets .image-gallery-bullets-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
