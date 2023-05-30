import logo from "./../../assets/logo.png";
import { LogoContainer } from "./style";

const Logo = () => {
    return (
        <LogoContainer>
            <img src={logo} alt="logo"/>
            <h1>TrackIt</h1>
        </LogoContainer>
    );
};

export default Logo;