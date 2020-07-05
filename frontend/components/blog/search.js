import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}

        {results.map((result, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${result.slug}`}>
                <a className="text-primary">{result.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            onChange={handleChange}
            type="search"
            className="form-control"
            placeholder="Search blogs"
            // value={search}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && <div>{searchedBlogs(results)}</div>}
    </div>
  );
};

export default Search;
