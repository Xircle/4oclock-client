import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../lib/v2/reducers/reducer";

export default function V2CreatePlacePage() {
  const { activityType } = useSelector(
    (state: RootState) => state.placeReducer,
  );
  return <Container>{activityType}</Container>;
}

const Container = styled.div``;
