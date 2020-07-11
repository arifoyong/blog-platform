import Layout from "../../../components/layout";
import Private from "../../../components/auth/private";
import BlogUpdate from "../../../components/crud/blogupdate";
import Link from "next/link";

const UpdateBlog = () => {
  return (
    <Layout>
      <Private>
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
      </Private>
    </Layout>
  );
};

export default UpdateBlog;
