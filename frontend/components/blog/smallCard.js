import moment from "moment";
import renderHTML from "react-render-html";
import Link from "next/link";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              style={{ maxHeight: "150px", width: "auto" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              className="img img-fluid"
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5 className="card-title">{blog.title}</h5>
          </Link>
          <div className="card-text">{renderHTML(blog.excerpt)}</div>
        </section>
      </div>

      <div className="card-body">
        Posted {moment(blog.updatedAt).fromNow()} by{" "}
        <Link href="/">
          <a className="float-right">{blog.postedBy.name}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
