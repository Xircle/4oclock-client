import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Heading,
  MidInput,
  colors,
  FileLabel,
  FlexDiv,
  Avartar,
  BigTextArea,
} from "../../styles/styles";
import DatePicker from "react-date-picker";

interface Props {}

export default function EditPlacePage(props: Props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container>
      <Heading>장소 변경</Heading>
      <Container>
        모임일
        <div>
          <DatePicker onChange={setStartDate} value={startDate} />
        </div>
      </Container>
    </Container>
  );
}
