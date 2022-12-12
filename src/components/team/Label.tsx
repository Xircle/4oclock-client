import styled from "styled-components";

interface Props {
  labelName: string;
  description?: string;
  mandatory?: string;
}

export default function ({ labelName, description, mandatory }: Props) {
  return (
    <Container>
      <TeamLabel>
        {labelName}
        {mandatory ? <Mandatory>{mandatory}</Mandatory> : <></>}
      </TeamLabel>
      {description ? <Description>{description}</Description> : <></>}
    </Container>
  );
}

const Mandatory = styled.div``;

const Container = styled.div``;

const TeamLabel = styled.div`
  color: #12121d;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const Description = styled.div``;
