import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Form from "common/Form";

function EditArticle() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState(null);

  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const res = await articlesApi.show(slug);
      setArticle({ ...res.data.article });
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories([...res.data.categories]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setBody(article.body);
      setCategory({ value: `${article.category_id}`, label: article.category });
    }
  }, [article]);

  const handleSubmit = async (e, state = "draft") => {
    e.preventDefault();
    setLoading(true);
    try {
      await articlesApi.update({
        slug: article.slug,
        payload: {
          article: {
            title,
            body: body,
            state,
            category_id: category.value,
          },
        },
      });
      setTitle("");
      setBody("");
      history.push("/articles");
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      loading={loading}
      title={title}
      body={body}
      category={category}
      state={article?.state}
      slug={article?.slug}
      setTitle={setTitle}
      setBody={setBody}
      setCategory={setCategory}
      categories={categories}
      handleSubmit={handleSubmit}
      handleClose={() => history.push("/articles")}
    />
  );
}

export default EditArticle;
