import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Heading } from "../../../styles/styles";
import {
  getPlacesByLocation,
  PlaceLocation,
} from "../../../lib/api/getPlacesByLocation";
import { useQuery } from "react-query";
import PlaceFeedRowsContainer from "../../../components/placeFeed/PlaceFeedContainer";
import {
  GetPlacesByLocationOutput,
  PlaceFeedData,
} from "../../../lib/api/types";

interface Props {}

export default function EditPlacesPage(props: Props) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery<
    GetPlacesByLocationOutput | undefined
  >(["place", page, 100], () => getPlacesByLocation("전체", page, 100), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container>
      <Heading>장소 변경</Heading>
      <Container>
        <PlaceFeedRowsWrapper>
          <PlaceFeedRowsContainer
            hasError={isError}
            isLoading={isLoading}
            placeFeedDataArray={data?.places}
            isAdminEditPlace={true}
          />
        </PlaceFeedRowsWrapper>
      </Container>
    </Container>
  );
}
const PlaceFeedRowsWrapper = styled.div`
  min-height: 50vh;
`;
