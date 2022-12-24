import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function CurrentTime() {
  const [currentTime, setcurrentTime] = useState(new Date());
  const currentHour = currentTime.getHours().toString();
  const currentMinute = currentTime.getMinutes().toString();

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
