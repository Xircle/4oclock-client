import styled from "styled-components";

interface Props {
  bannerImageUrl?: string;
}

export default function EventBanner({ bannerImageUrl }: Props) {
  return (
    <Container>
      <BannerImage src={bannerImageUrl || "/banner/halloween/halloween1.png"} />
    </Container>
  );
}

const Container = styled.div`
  width: 93%;
  height: 100px;
  border-radius: 4px;
  margin: 0px auto 10px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;
