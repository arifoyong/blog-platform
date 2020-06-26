import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const publishBlog = () => {
  console.log("publish");
};

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let catArray = [];
    blogCategories.map((c, i) => {
      catArray.push(c._id);
    });

    setCheckedCat(catArray);
  };

  const setTagsArray = (blogTags) => {
    let tagArray = [];
    blogTags.map((t, i) => {
      tagArray.push(t._id);
    });

    setCheckedTag(tagArray);
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const findOutCategory = (catId) => {
    const result = checkedCat.indexOf(catId);
    if (result !== -1) {
      return true;
    }
    return false;
  };

  const findOutTag = (tagId) => {
    const result = checkedTag.indexOf(tagId);
    if (result !== -1) {
      return true;
    }
    return false;
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleTag(t._id)}
            checked={findOutTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const handleToggle = (catId) => () => {
    setValues({ ...values, error: "" });

    const clickedCategory = checkedCat.indexOf(catId);
    const all = [...checkedCat];

    if (clickedCategory === -1) {
      all.push(catId);
    } else {
      all.splice(clickedCategory, 1);
    }

    setCheckedCat(all);
    formData.set("categories", all);
  };

  const handleToggleTag = (tagId) => () => {
    setValues({ ...values, error: "" });

    const clickedTag = checkedTag.indexOf(tagId);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(tagId);
    } else {
      all.splice(clickedTag, 1);
    }

    setCheckedTag(all);
    formData.set("tags", all);
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const editBlog = () => {
    console.log("update blog");
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
            value={title}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formt={QuillFormats}
            value={body}
            onChange={handleBody}
            placeholder="write something amazing..."
          />
        </div>
        <div>
          <button type="submit" className="btn  btn-primary">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-4">show success & derror</div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>

              <small className="text-muted">Max size: 1MB</small>
              <br />
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
