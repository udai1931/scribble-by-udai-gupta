import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Form from "common/Form";
import Navbar from "common/Navbar";
import RestoreModal from "common/RestoreModal";
import VersionHistory from "common/VersionHistory";

function EditArticle() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
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
    fetchVersions();
  }, []);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setBody(article.body);
      setCategory(article.category);
    }
  }, [article]);

  const fetchVersions = async () => {
    try {
      const res = await articlesApi.versions(slug);
      setVersions([...res.data.versions]);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleSubmit = async (e, state = "draft", tag = "drafted", version) => {
    e.preventDefault();
    setLoading(true);
    let articleObj = {};
    if (version) {
      articleObj = {
        title: version.title,
        body: version.body,
        category_id: version.category.value,
        state,
        tag,
      };
    } else {
      articleObj = { title, body, category_id: category.value, state, tag };
    }
    try {
      await articlesApi.update({
        slug: article.slug,
        payload: {
          article: articleObj,
        },
      });
      fetchVersions();
      fetchArticle();
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
      setShowRestoreModal(false);
    }
  };
  return (
    <div className="flex h-full w-full">
      <RestoreModal
        showRestoreModal={showRestoreModal}
        setShowRestoreModal={setShowRestoreModal}
        selectedVersion={selectedVersion}
        handleSubmit={handleSubmit}
      />
      <Navbar state={article?.state} slug={article?.slug} />
      <div className="w-9/12">
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
      </div>
      <div className="w-3/12">
        <VersionHistory
          setShowRestoreModal={setShowRestoreModal}
          versions={versions}
          setSelectedVersion={setSelectedVersion}
        />
      </div>
    </div>
  );
}

export default EditArticle;
