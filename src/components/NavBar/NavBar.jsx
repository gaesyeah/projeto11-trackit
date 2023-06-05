import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { NavContainer, StyledArrow } from "./style";

const NavBar = () => {

    const {name, image, showSideBar, setShowSideBar, notLogged} = useContext(DataContext);

    return (
        <NavContainer not={notLogged} showSideBar={showSideBar} data-test="header">
            <h3>TrackIt</h3>
            <div>
                <img 
                    src={image} 
                    alt={name}
                    data-test="avatar"
                />
                <StyledArrow onClick={() => setShowSideBar(true)}/>
            </div>
        </NavContainer>
    );
};

export default NavBar;