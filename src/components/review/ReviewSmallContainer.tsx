import styled from "styled-components";
import { Container } from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
import type { Review } from "../../lib/api/types";
import { useState, useEffect } from "react";
import optimizeImage from "../../lib/optimizeImage";

interface Props {
  title: string;
  reviews: Review[];
}

export default function ReviewSmallContainer({ title, reviews }: Props) {
  const [page, setPage] = useState(1);

  let i = 0;
  let length = reviews.length;
  while (i < length) {
    if (reviews[i].isRepresentative) {
      reviews.splice(i, 1);
      --length;
    } else {
      i++;
    }
  }

  const history = useHistory();
  return (
    <Container>
      <Seperator></Seperator>
      <InnerWrapper>
        <Heading>
          <Title>{title}</Title>
          <CTAText
            onClick={() => {
              history.push(`/v1/reviews`);
            }}
          >
            구경하기
            <FontAwesomeIcon
              icon={faChevronRight}
              color={"#6f7789"}
              style={{ marginLeft: "3px", paddingTop: "1px" }}
            />
          </CTAText>
        </Heading>

        <SCarousel
          infiniteLoop={false}
          showArrows={false}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          emulateTouch={true}
        >
          {reviews?.map((review) => {
            if (review.imageUrls.length > 0) {
              return (
                <CarouselWrapper key={review.id}>
                  <CarouselImg
                    src={optimizeImage(review.imageUrls[0], {
                      width: 250,
                      height: 170,
                    })}
                  />

                  {/* <CarouselDescription>
                    {review.description}
                  </CarouselDescription> */}
                </CarouselWrapper>
              );
            } else {
              return <></>;
            }
          })}
        </SCarousel>
      </InnerWrapper>
      <Seperator></Seperator>
    </Container>
  );
}

const Seperator = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f8fafd;
  box-shadow: inset 0px 2px 5px rgba(111, 119, 137, 0.08);
`;

const InnerWrapper = styled.div`
  width: 325px;
  margin: 15px auto;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const CTAText = styled.div`
  color: #6f7789;
  font-size: 12px;
  cursor: pointer;
`;

const SCarousel = styled(Carousel)`
  padding: 15px 0;
  width: 100%;
`;

const CarouselImg = styled.img`
  width: 230px;
  height: 170px;
  margin-right: 8px;
  object-fit: cover;
  border-radius: 3px;
`;

const CarouselWrapper = styled.div`
  margin-right: 8px;
  position: relative;
`;

const CarouselDescription = styled.div`
  position: absolute;
  left: -10px;
  bottom: 15px;
  width: 70%;
  color: white;
  font-size: 13px;
  font-weight: 500;
`;
