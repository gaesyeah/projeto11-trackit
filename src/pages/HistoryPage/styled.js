import styled from "styled-components";

export const StyledP = styled.p`
    width: 340px;
    text-align: center;
    padding-left: 3px;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    span{
        color: #5cba5c;
        &:nth-child(2){
            color: #eba32f;
        }
        &:last-child{
            color: #f24d4d;
        }
    }
`;