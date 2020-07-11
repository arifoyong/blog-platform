import Head from "next/head";
import Link from "next/link";
import { userPublicProfile } from "../../actions/user";
import Layout from "../../components/layout";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

import moment from "moment";

const Username = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} blogs | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username}  | ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${DOMAIN}/images/og_image/jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/images/og_image/jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-4 mb-4 pl-2" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>{user.name}</h5>

                      <p className="text-muted">
                        Joined: {moment(user.createdAt).fromNow()}
                      </p>
                    </div>

                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: "auto", maxWidth: "100%" }}
                        alt="userProfile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pb-4 pl-4 pt-4 pr-4 text-white">
                    Recent blog by {user.name}
                  </h5>

                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pb-4 pl-4 pt-4 pr-4 text-white">
                    Message {user.name}
                  </h5>
                  <p>Contact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

Username.getInitialProps = ({ query }) => {
  console.log("initial props", query.username);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
  // return { user: "ok" };
};

export default Username;
