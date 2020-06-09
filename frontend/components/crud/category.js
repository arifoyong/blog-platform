import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: false,
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">"Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category existed</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category removed</p>;
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          reload: !reload,
        });
      }
    });
  };

  const deleteCategory = (slug) => {
    const answer = window.confirm("Are you sure to delete this category?");

    if (answer) {
      removeCategory(slug, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            removed: !removed,
            reload: !reload,
          });
        }
      });
    }
  };

  const showCategories = () => {
    return categories.map((category, i) => {
      return (
        <button
          key={i}
          onDoubleClick={() => deleteCategory(category.slug)}
          title="Double click to delete"
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {category.name}
        </button>
      );
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  const mouseMoveHandler = () => {
    setValues({ ...values, error: false, success: false, removed: false });
  };
  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={() => mouseMoveHandler()}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;
