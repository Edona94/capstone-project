import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../styling/SignForm.css"
import {toast} from "react-hot-toast";

type Props = {
    action: "sign-up" | "sign-in"
}

export default function SignForm(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();


    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        const btoaString = `${username}:${password}`
        const url = "/api/users" + (props.action === "sign-in" ? "/login" : "")
        const data = props.action === "sign-in" ? {} : {username, password}
        const config = props.action === "sign-in" ? {headers: {Authorization: `Basic ${window.btoa(btoaString)}`}} : {}
        const navigateTo = props.action === "sign-in" ? window.sessionStorage.getItem('signInRedirect') || '/' : "/";
        event.preventDefault();
        axios.post(url, data, config)
            .then(() => {
                if (props.action === "sign-up") {
                    toast.success('Successfully registered 🙂');
                } else if (props.action === "sign-in") {
                    toast.success('Successfully signed in 👍');
                }
                navigate(navigateTo);
            })
            .catch(err => {
            console.error(err);
            toast.error('Error:'+ (err.response.data.error || err.response.data.message));
        });
    }

    return (
        <form className={"signup-form"} onSubmit={formSubmitHandler}>
            <div>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        placeholder={"username"}
                        onChange={handleUsernameChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        placeholder={"password"}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>

            <button type="submit">
                {props.action === "sign-in" && "Sign In"}
                {props.action === "sign-up" && "Sign Up"}
            </button>
        </form>
    )
}