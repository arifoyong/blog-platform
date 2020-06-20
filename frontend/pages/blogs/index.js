import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next mongodb web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web development tutorials  | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next mongodb web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
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

  const loadMore = () => {
    let toSkip = skip + limit;

    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-primary">
          Load more
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  const showAllCategories = () => {
    return categories.map((category, i) => (
      <Link key={i} href={`/categories/${category.slug}`}>
        <a className="btn btn-sm btn-info mr-1 ml-1 mt-3">{category.slug}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <a className="btn btn-sm btn-outline-info mr-1 ml-1 mt-3">{tag.slug}</a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <br />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-flud">
            <header>
              <div className="cold-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Blogs & Tutorial
                </h1>
              </div>
            </header>
            <section>
              <div className="pb-5 text-center">
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </section>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
          <div>{size}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;

  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
