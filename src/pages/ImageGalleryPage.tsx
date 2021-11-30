import styled from "styled-components";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEffect } from "react";
import optimizeImage from "../lib/optimizeImage";

export interface ImageGalleryPayload {
  id: string;
  imageUrls: string[];
  description?: string;
}
interface Props
  extends RouteComponentProps<
    { index: string },
    {},
    { payload: ImageGalleryPayload }
  > {}

export default function ImageGalleryPage({ match, history, location }: Props) {
  const { index = 0 } = match.params;
  const { payload } = location.state;

  useEffect(() => {
    document
      ?.getElementById("image-gallery")
      ?.scrollIntoView({ block: "center" });
  }, []);

  if (!payload?.imageUrls || payload.imageUrls.length === 0) {
    history.goBack();
  }
  const images: ReactImageGalleryItem[] = payload.imageUrls.map((imageUrl) => ({
    original: imageUrl,
    thumbnail: imageUrl,
  }));

  const HistoryPop = () => {
    history.goBack();
  };

  return (
    <Container onClick={() => HistoryPop()}>
      <Wrapper
        id="image-gallery"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn>
          <img src="/icons/close.svg" alt="close" onClick={HistoryPop} />
        </CloseBtn>
        <ImageGallery
          items={images}
          startIndex={+index}
          showIndex={true}
          showBullets={payload.imageUrls.length === 1 ? false : true}
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
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
`;

const Wrapper = styled.div`
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
  .image-gallery-left-nav .image-gallery-svg,
  .image-gallery-right-nav .image-gallery-svg {
    width: 30px;
    height: 120px;
  }

  .image-gallery-bullets .image-gallery-bullets-container {
    top: 50px;
  }

  .image-gallery-bullets .image-gallery-bullet {
    padding: 3px;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .image-gallery-index {
    span {
      color: #fff;
    }
  }
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 10px;
  width: 48px;
  height: 48px;
`;
