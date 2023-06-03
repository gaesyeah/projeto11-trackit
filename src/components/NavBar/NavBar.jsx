import { useContext } from "react";
import { DataContext } from "../../App";
import menuIcon from "./../../assets/menuIcon.png";
import { NavContainer } from "./style";

const NavBar = ({image, name, setShowSideBar}) => {

    const {showSideBar} = useContext(DataContext);

    return (
        <NavContainer showSideBar={showSideBar} data-test="header">
            <div>
                <img 
                    onClick={() => setShowSideBar(true)} 
                    src={menuIcon} 
                    alt='logOut'
                />
                <h3>TrackIt</h3>
            </div>
            <div>
                <p>{name}</p>
                <img 
                    src={image} 
                    alt='userImg'
                    data-test="avatar"
                />
            </div>
        </NavContainer>
    );
};

export default NavBar;