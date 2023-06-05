import { useContext } from "react";
import { DataContext } from "../../App";
import { NavContainer, StyledArrow } from "./style";

const NavBar = () => {

    const {image, showSideBar, setShowSideBar, notLogged} = useContext(DataContext);

    return (
        <NavContainer not={notLogged} showSideBar={showSideBar} data-test="header">
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