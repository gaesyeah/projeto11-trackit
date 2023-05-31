import styled from "styled-components";

export const Progress = styled.div`
    margin-left: -60px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    h2{
        margin-left: -80px;
    }
    p{
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }
    span{
        margin-left: ${({today}) => today < 100 ? '-40px' : '-32px'};
        color: #8FC549;
    }
`;
export const TodayHabitsBox = styled.div`
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-bottom: 34px;
`;
export const Loading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 150px;
    }
`;