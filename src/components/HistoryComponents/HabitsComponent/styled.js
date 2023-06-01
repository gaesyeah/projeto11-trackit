import styled from "styled-components";
import { CheckSquareFill, XSquareFill } from "styled-icons/bootstrap";

export const HabitChecked = styled(CheckSquareFill)`
    margin: 11px;
    right: 0;
    top: 0;
    position: absolute;
    color: #5cba5c;
    width: 69px;
`
export const HabitNotChecked = styled(XSquareFill)`
    margin: 11px;
    right: 0;
    top: 0;
    position: absolute;
    color: #f24d4d;
    width: 69px;
`