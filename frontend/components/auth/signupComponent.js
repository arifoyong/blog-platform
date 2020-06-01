import { useState } from "react";
import { signup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "John",
    email: "johndoe@company.com",
    password: "1234",
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
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        console.table(values);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            className="form-control"
            placeholder="name"
          />
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
            Signup
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
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
