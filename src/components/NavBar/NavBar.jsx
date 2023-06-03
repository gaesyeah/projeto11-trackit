import { useContext } from "react";
import { DataContext } from "../../App";
import menuIcon from "./../../assets/menuIcon.png";
import { NavContainer, StyledArrow } from "./style";

const NavBar = () => {

    const {image, showSideBar, setShowSideBar} = useContext(DataContext);

    return (
        <NavContainer showSideBar={showSideBar} data-test="header">
            <h3>TrackIt</h3>
            <div>
                <img 
                    src={image} 
                    alt='userImg'
                    data-test="avatar"
                />
                <StyledArrow onClick={() => setShowSideBar(true)}/>
            </div>
        </NavContainer>
    );
};

export default NavBar;