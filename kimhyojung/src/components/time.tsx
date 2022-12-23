import styled from 'styled-components';

export default function CurrentTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours().toString();
  const currentMinute = currentDate.getMinutes().toString();

  return (
    <>
      <StyledTime>
        {Number(currentHour) < Number(10) ? '0' + currentHour : currentHour} :
        {Number(currentMinute) < Number(10)
          ? '0' + currentMinute
          : currentMinute}
      </StyledTime>
      <StyledPhrases>Have a nice day</StyledPhrases>
    </>
  );
}

const StyledTime = styled.section`
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 10%;
`;

const StyledPhrases = styled.section`
  font-size: 2.5rem;
  color: white;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
