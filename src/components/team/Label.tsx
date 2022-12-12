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
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  /* or 145% */

  color: #a7b0c0;
  width: 80%;
`;
