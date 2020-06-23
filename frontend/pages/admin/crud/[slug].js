import Layout from "../../../components/layout";
import Admin from "../../../components/auth/admin";
import BlogUpdate from "../../../components/crud/blogupdate";
import Link from "next/link";

const UpdateBlog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update Blog</h2>
            </div>

            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default UpdateBlog;
