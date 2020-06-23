import Layout from "../../../components/layout";
import Admin from "../../../components/auth/admin";
import BlogRead from "../../../components/crud/blogRead";
import Link from "next/link";

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>

            <div className="col-md-12">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
