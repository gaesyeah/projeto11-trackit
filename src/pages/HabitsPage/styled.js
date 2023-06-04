import styled from "styled-components";
import { Trash3 } from "styled-icons/bootstrap";
import { PlusSquare } from "styled-icons/evaicons-solid";

export const TopBar = styled.div`
    z-index: 2;
    width: 340px;
    background: #E5E5E5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -10px;
    padding-top: 17px;
`;
export const NoHabits = styled.h1`
    margin-top: 27px;
    width: 338px;
`;
export const AddHabitBox = styled.form`
    transition: 500ms;
    top: ${({showCreation}) => !showCreation ? '-200px' : '0'};
    z-index: ${({showCreation}) => !showCreation ? '-0.5' : '1'};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
    width: 340px;
    margin-bottom: ${({showCreation}) => !showCreation ? '-200px' : '0'};
    min-height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    input{
        margin-top: 18px;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
    }
`;
export const ConfirmButtons = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    column-gap: 14px;
    margin: 0 16px 15px 0;
    button{
        font-size: 16px;
        line-height: 20px;
        width: 84px;
        height: 34px;
        &:nth-child(1){
            background-color: #FFFFFF;
            color: #52B6FF;
        }
    }
`;
export const WeekDayButtons = styled.div`
    margin-left: -69px;
    display: flex;
    column-gap: 4px;
`;
export const MyHabits = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: ${({small}) => !small ? '504px' : '192px'};
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;
export const MyHabit = styled.div`
    position: relative;
    width: 340px;
    min-height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    h3{
        border-radius: 16px;
        max-width: 288px;
        white-space: pre;
        overflow-y: auto;
        white-space: pre;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin: 13px 0 0 15px;
    }
`;
export const MyHabitDays = styled.div`
    margin: 8px 0 0 14px;
    display: flex;
    column-gap: 4px;
`;
export const MyHabitDay = styled.button`
    transition: 500ms;
    text-align: center;
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    line-height: 25px;
    background: ${({days, day}) => days.includes(day) ? '#CFCFCF' : '#FFFFFF'};
    color: ${({days, day}) => days.includes(day) ? '#FFFFFF' : '#DBDBDB'};
    &:disabled{
        opacity: ${({falsebutton}) => falsebutton ? '1' : '0.5' };
    }
`;
export const PlusIcon = styled(PlusSquare)`
    cursor: pointer;
    width: 54px;
    color: #52B6FF;
    margin-right: -8px;
`;
export const TrashIcon = styled(Trash3)`
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
    width: 20px;
    &:hover{
        color: red;
        transition-duration: 300ms;
    }
`;