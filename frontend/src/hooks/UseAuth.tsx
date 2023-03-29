import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../model/User";

export default function useAuth (redirectToSignIn?: boolean) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        axios.get("/api/users/me").then(res => {
            setUser(res.data);
        }).catch(e => {
            if (redirectToSignIn && e.response.status === 401) {
                window.sessionStorage.setItem("signInRedirect", pathname || "/");
                navigate("/sign-in");
            }
        });
    }, [pathname, navigate, redirectToSignIn]);

    return user;
}