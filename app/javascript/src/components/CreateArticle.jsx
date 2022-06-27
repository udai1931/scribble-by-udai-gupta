import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Form from "common/Form";
import Navbar from "common/Navbar";

function CreateArticle() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories([...res.data.categories]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e, state = "draft") => {
    e.preventDefault();
    setLoading(true);
    try {
      await articlesApi.create({
        article: {
          title,
          body: body,
          state,
          category_id: category.value,
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
    <>
      <Navbar />
      <Form
        loading={loading}
        title={title}
        body={body}
        setTitle={setTitle}
        setBody={setBody}
        category={category}
        setCategory={setCategory}
        categories={categories}
        handleSubmit={handleSubmit}
        handleClose={() => history.push("/articles")}
      />
    </>
  );
}

export default CreateArticle;
