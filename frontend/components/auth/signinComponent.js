import { useState } from "react";
import { signin } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "alexwong@company.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });
  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    console.table(values);
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        console.table(values);
        setValues({ ...values, error: data.error });
      } else {
        // save token to cookie
        // save user info to local storage
        // authenticate user
        Router.push(`/`);
      }
    });
  };

  const handleChange = (e) => {
    e.persist();
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="email"
          />
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;
