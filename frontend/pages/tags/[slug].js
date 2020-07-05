import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/layout";
import { singleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import Card from "../../components/blog/card";

const Category = ({ tag, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((blog, i) => (
                  <Card blog={blog} key={i} />
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Category;
