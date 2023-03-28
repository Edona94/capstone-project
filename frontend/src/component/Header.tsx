import Navigation from "./Navigation";
import '../styling/Header.css'

export default function Header() {
    return(
        <header className={"header"}>
            <div>
            <h2>HR<span>works</span>
            <Navigation/></h2>
            </div>
        </header>
    )
}