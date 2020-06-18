const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { smartTrim } = require("../helpers/blog");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "error" });
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({ error: "Content is too short" });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: "At least 1 category is required" });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "At least 1 tag is required" });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, " ", "...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdescription = stripHtml(body.substr(0, 160));
    blog.postedBy = req.user._id;

    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({ error: "Image should be less than 1MB" });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      Blog.findByIdAndUpdate(
        result._id,
        {
          $push: { categories: arrayOfCategories },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            {
              $push: { tags: arrayOfTags },
            },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({ error: errorHandler(err) });
            }

            return res.json(result);
          });
        }
      });
      // return res.json(result);
    });
  });
};

exports.list = (req, res) => {
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      }

      res.json(data);
    });
};

exports.listAllBlogsCategoriesTags = (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 10;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      }

      blogs = data;

      Category.find({}).exec((err, cat) => {
        if (err) {
          return res.json({ error: errorHandler(err) });
        }

        categories = cat;
        Tag.find({}).exec((err, tg) => {
          if (err) {
            return res.json({ error: errorHandler(err) });
          }

          tags = tg;

          return res.json({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .select(
      "_id title slug body mtitle mdesc categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      }

      res.json(data);
    });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  console.log(slug);
  Blog.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({ error: errorHandler(err) });
    }

    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog has been deleted successfully" });
  });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();
};
