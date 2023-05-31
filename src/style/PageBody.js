import styled from "styled-components";

export const PageBody = styled.div`
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background: #E5E5E5;
    padding: 70px 0 70px 0;
    font-family: 'Lexend Deca', sans-serif;
`;

export const NullLoading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 150px;
    }
`;