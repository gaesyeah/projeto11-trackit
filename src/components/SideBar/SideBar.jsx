import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../../App";

const SideBar = () => {

    const {showSideBar} = useContext(DataContext);

    return (
        <StyledSideBar showSideBar={showSideBar}>

        </StyledSideBar>
    );
}

export default SideBar;

const StyledSideBar = styled.aside`
    z-index: 2;
    position: fixed;
    left: ${({showSideBar}) => !showSideBar ? '-200px' : '0'};
    transition-duration: 400ms;
    width: 200px;
    height: 100%;
    background-color: #FFFFFF;
`;