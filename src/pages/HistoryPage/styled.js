import styled from "styled-components";

export const StyledP = styled.p`
    text-align: center;
    padding-left: 3px;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    span{
        color: #5cba5c;
        &:nth-last-child(){
            color: #f24d4d;
        }
    }
`;