import '../styling/Header.css'
import axios from "axios";
import {useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navigation() {
    const user = useAuth(false)
    const location = useLocation()

    function handleLogOutClick() {
        axios.post("/api/users/logout").then(() => {
            window.sessionStorage.setItem(
                "signInRedirect",
                location.pathname || "/"
            );
            window.location.href = "/sign-in";
        });
    }

    return !user ? <> </> : (
        <nav className={"nav"}>
            <button onClick={handleLogOutClick}>Log out</button>
        </nav>
    )
}