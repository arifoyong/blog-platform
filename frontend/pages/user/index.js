import Layout from "../../components/layout";
import Link from "next/link";
import Private from "../../components/auth/private";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/user/crud/blog">
                    <a>Create blog</a>
                    {/* <a href="/admin/crud/blog">Create blog</a> */}
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                    <a>Update/Delete blogs</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
