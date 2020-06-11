import { useState, useEffect } from "react";
import { create, getTags, removeTag } from "../../actions/tag";
import { getCookie } from "../../actions/auth";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((tag, i) => {
      return (
        <button
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          title="Double click to remove"
          onDoubleClick={() => deleteConfirm(tag.slug)}
        >
          {tag.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    const ans = window.confirm("Are you sure to delete this tag?");

    if (ans) {
      removeTag(slug, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            reload: !reload,
            error: false,
            success: false,
          });
        }
      });
    }
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

  const createTag = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, name: "", error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          error: false,
          success: "tags added",
          reload: !reload,
        });
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag existed</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag removed</p>;
    }
  };

  const createTagForm = () => (
    <form onSubmit={createTag}>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Tag
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary ">
        Create
      </button>
    </form>
  );

  const mouseMoveHandler = () => {
    setValues({
      ...values,
      error: false,
      success: false,
      removed: false,
    });
  };

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={() => mouseMoveHandler()}>
        {createTagForm()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default Tag;
