import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import Form from "common/Form";

function CreateArticle() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const history = useHistory();

  const handleSubmit = async (e, state = "Draft") => {
    e.preventDefault();
    setLoading(true);
    try {
      await articlesApi.create({
        article: { title, description: desc, state },
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
      handleSubmit={handleSubmit}
      handleClose={() => history.push("/articles")}
      loading={loading}
      title={title}
      desc={desc}
      setTitle={setTitle}
      setDesc={setDesc}
    />
  );
}

export default CreateArticle;
