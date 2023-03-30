import SignForm from "./SignForm";
import Layout from "./Layout";

export default function SignInPage() {

    return (
        <Layout>
            <h1>Sign In</h1>
            <div style={{padding: "5rem 0"}}>
                <SignForm action={"sign-in"}/>
            </div>
        </Layout>
    );
}