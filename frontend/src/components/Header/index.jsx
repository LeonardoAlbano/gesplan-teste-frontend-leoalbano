import { Container } from "./styled";
import logo from '../../assets/gesplanLogo.svg'

export function Header() {
    return(
        <Container>
            <img src={logo} />
        </Container>
    )
}