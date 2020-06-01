import Layout from "../components/layout";
import Link from "next/link";
import SignupComponent from "../components/auth/signupComponent";

const Signup = () => {
  return (
    <Layout>
      <h2>Sign Up</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
