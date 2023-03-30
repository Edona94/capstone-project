import {useEffect, useState} from "react";
import {User} from "../model/User";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function useAuth (redirectToSignIn?: boolean) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const isAdmin:boolean = user?.role === "ADMIN"

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

    return {user,isAdmin};
}