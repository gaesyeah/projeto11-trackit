import { useContext } from "react";
import { BooleanContext } from "../../contexts/BooleanContext";
import { UserContext } from "../../contexts/UserContext";
import { NavContainer, StyledArrow } from "./style";

const NavBar = () => {

    const {name, image} = useContext(UserContext);
    const {showSideBar, setShowSideBar, notLogged} = useContext(BooleanContext);

    return (
        <NavContainer not={notLogged} showSideBar={showSideBar} data-test="header">
            <h3>TrackIt</h3>
            <div>
                <img data-test="avatar"
                    src={image} 
                    alt={name}
                />
                <StyledArrow onClick={() => setShowSideBar(true)}/>
            </div>
        </NavContainer>
    );
};

export default NavBar;