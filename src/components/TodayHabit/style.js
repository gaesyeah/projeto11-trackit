import styled from "styled-components";
import { CheckSquareFill } from "styled-icons/bootstrap";

export const Habit = styled.div`
    position: relative;
    width: 340px;
    min-height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    h3{
        border-radius: 16px;
        max-width: 232px;
        white-space: pre;
        overflow-y: auto;
        white-space: pre;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin: 13px 0 5px 15px;
    }
    p{
        margin-left: 14px;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
            span{
                transition: 500ms ease-out;
            }
    }
    p:nth-child(2){
        span{
            color:${({done, current, highest}) => 
                (current === highest && current > 0) 
                ? 
                '#8FC549' 
                : 
                (!done) ? '#666666' : '#8FC549'
            };
        }
    }
    p:nth-child(3){
        span{
            color:${({highest, current}) => 
                highest === 0 
                ? 
                '#666666' 
                : 
                (highest === current) ? '#8FC549' : '#666666'
            };
        }
    }
    div{
        position: absolute;
        margin: 13px;
        right: 0;
        top: 0;
        img{
            margin: -15px;
            position: absolute;
            width: 100px;
            opacity: 0.5;
        }
    }

    h2{
        margin-left: 14px;
        font-size: 13px;
        line-height: 16px;
        color: ${({done}) => !done ? '#f24d4d' : '#5cba5c'};
    }
`;
export const TodayCheck = styled(CheckSquareFill)`
    transition-duration: 500ms;
    cursor: ${({loading}) => loading ? 'default' : 'pointer'};
    opacity: ${({loading}) => loading ? '0.7' : '1'};
    color: ${({done}) => !done ? '#EBEBEB' : '#8FC549'};
    width: 69px;
`