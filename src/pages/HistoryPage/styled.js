import styled from "styled-components";

export const StyledP = styled.p`
    width: 340px;
    text-align: center;
    padding-left: 3px;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    span{
        color: #f24d4d;
        &:nth-child(2){
            color: #5cba5c;
        }
        &:last-child{
            color: #eba32f;
        }
    }
`;