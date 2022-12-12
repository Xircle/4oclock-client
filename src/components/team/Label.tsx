import styled from "styled-components";

interface Props {
  labelName: string;
  description?: string;
  mandatory?: boolean;
}

export default function ({ labelName, description, mandatory }: Props) {
  return (
    <Container>
      <TeamLabel>
        {labelName}
        {mandatory ? <Mandatory>*</Mandatory> : <></>}
      </TeamLabel>
      {description ? <Description>{description}</Description> : <></>}
    </Container>
  );
}

const Mandatory = styled.div`
  color: #fd8a66;
`;

const Container = styled.div``;

const TeamLabel = styled.div`
  color: #12121d;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: flex-start;
`;

const Description = styled.div``;
