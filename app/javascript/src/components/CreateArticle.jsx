import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Form from "common/Form";

function CreateArticle() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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

  const handleSubmit = async (e, state = "Draft") => {
    e.preventDefault();
    setLoading(true);
    try {
      await articlesApi.create({
        article: {
          title,
          description: desc,
          state,
          category_id: category.value,
        },
      });
      setTitle("");
      setDesc("");
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
      desc={desc}
      setTitle={setTitle}
      setDesc={setDesc}
      category={category}
      setCategory={setCategory}
      categories={categories}
      handleSubmit={handleSubmit}
      handleClose={() => history.push("/articles")}
    />
  );
}

export default CreateArticle;
