import styled from "styled-components";
import { Container } from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";

interface Props {
  title: string;
}

export default function ReviewSmallContainer({ title }: Props) {
  const history = useHistory();
  return (
    <Container>
      <Seperator></Seperator>
      <InnerWrapper>
        <Heading>
          <Title>{title}</Title>
          <CTAText
            onClick={() => {
              history.push(`/reviews`);
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
        >
          <CarouselWrapper>
            <CarouselImg src="/avatar/Avartar001.jpeg" />
            <CarouselDescription>#10.10 신촌 술익는 마을</CarouselDescription>
          </CarouselWrapper>
          <CarouselWrapper>
            <CarouselImg src="/avatar/Avartar001.jpeg" />
            <CarouselDescription>#10.10 신촌 술익는 마을</CarouselDescription>
          </CarouselWrapper>
          <CarouselWrapper>
            <CarouselImg src="/avatar/Avartar001.jpeg" />
            <CarouselDescription>#10.10 신촌 술익는 마을</CarouselDescription>
          </CarouselWrapper>
          <CarouselWrapper>
            <CarouselImg src="/avatar/Avartar001.jpeg" />
            <CarouselDescription>#10.10 신촌 술익는 마을</CarouselDescription>
          </CarouselWrapper>
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
  height: 150px;
  margin-right: 2px;
  object-fit: cover;
  border-radius: 3px;
`;

const CarouselWrapper = styled.div`
  margin-right: 2px;
  position: relative;
`;

const CarouselDescription = styled.div`
  position: absolute;
  left: -10px;
  bottom: 15px;
  width: 70%;
  color: white;
  font-size: 11.5px;
  font-weight: 500;
`;
