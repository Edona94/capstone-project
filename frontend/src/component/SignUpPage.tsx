import SignForm from "./SignForm";
import Layout from "./Layout";

export default function SignUpPage() {

    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h2 className={"sign-in-h2"}>Sign Up</h2>
                <SignForm action={"sign-up"}/>
            </div>
        </Layout>
    );
}