import '../styling/Header.css'
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navigation() {
    const {user} = useAuth(false)
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

    return (
        <div className={"nav"}>
            <div className={"navigation-block"}>
                <h2>HR<span>works</span></h2>
            </div>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className={"navigation-block"}>
                {user ?
                    <>
                        <Link to={"/"}><i className="fa fa-fw fa-home"></i>Home</Link>
                        <Link to={"/chart"}>Statistics</Link>
                        <Link to={'#'} onClick={handleLogOutClick}>Log out</Link>
                    </>
                    :
                    null
                }
            </div>
        </div>
    )
}