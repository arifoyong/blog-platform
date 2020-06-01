import Layout from "../components/layout";
import Link from "next/link";
import SigninComponent from "../components/auth/signinComponent";

const Signin = () => {
  return (
    <Layout>
      <h2>Sign In</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
