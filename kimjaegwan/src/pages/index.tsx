import React from 'react';
import styled from 'styled-components';
const Home = () => {
    return (
        <>
            <br />
            <h1>TodoList</h1>
            <StyledHomeBox>
                Todos
                <form>
                    <input placeholder="입력하세요."></input>
                    <button type="submit">추가</button>
                </form>
            </StyledHomeBox>
        </>
    );
};

export default Home;

const StyledHomeBox = styled.div`
    border: 3px solid black;
    width: 600px;
    margin-top: 1.875rem;
`;
