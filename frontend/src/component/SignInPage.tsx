import SignForm from "./SignForm";
import Layout from "./Layout";
import '../styling/SignForm.css'
import {Link} from "react-router-dom";

export default function SignInPage() {

    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h2 className={"sign-in-h2"}>Sign In</h2>
                <SignForm action={"sign-in"}/>
                <div className={"sign-in-div"}>
                   <p> Don't have an account?
                  <span> <Link to={"/sign-up"}>Sign up</Link></span></p>
                </div>
            </div>
        </Layout>
    );
}