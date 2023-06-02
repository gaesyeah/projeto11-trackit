import styled from "styled-components";
import { CheckCircle, XCircle } from "styled-icons/bootstrap";

export const HabitChecked = styled(CheckCircle)`
    margin: 11px;
    right: 0;
    top: 0;
    position: absolute;
    color: #5cba5c;
    width: 69px;
`
export const HabitNotChecked = styled(XCircle)`
    margin: 11px;
    right: 0;
    top: 0;
    position: absolute;
    color: #f24d4d;
    width: 69px;
`