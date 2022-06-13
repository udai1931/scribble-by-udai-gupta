import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { Table as NeetoUITable, Alert } from "neetoui";
import { Container } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import {
  TABLE_COLUMNS_FOR_DROPDOWN,
  TABLE_COLUMNS_FOR_TABLE,
} from "./constants";
import HeaderComponent from "./HeaderComponent";
import MenubarComponent from "./MenubarComponent";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetchArticles();
    fetchArticlesCount();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    let res;
    if (selectedTab === "All") {
      res = await articlesApi.list();
    } else if (selectedTab === "Draft" || selectedTab === "Published") {
      res = await articlesApi.listByState({ state: selectedTab });
    } else {
      res = await articlesApi.listByCategory({ category_id: selectedTab });
    }
    try {
      setArticles([...res.data.articles]);
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchArticlesCount = async () => {
    try {
      const res = await articlesApi.count();
      setArticlesCount({ ...res.data.count });
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

  const handleActionClick = (event, article) => {
    const action = event.target.getAttribute("action");
    if (action === "edit") {
      history.push(`/articles/edit/${article.slug}`);
    } else if (action === "delete") {
      setShowAlert(true);
    }
  };

  const handleDeleteAction = async () => {
    try {
      await articlesApi.destroy(selectedArticle.slug);
    } catch (err) {
      logger.error(err);
    } finally {
      setShowAlert(false);
      fetchArticlesCount();
      fetchCategories();
      fetchArticles();
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedTab]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Alert
        size="sm"
        isOpen={showAlert}
        title="Delete Article"
        message="Are you sure you want to delete? This action is irreversible."
        onClose={() => setShowAlert(false)}
        onSubmit={handleDeleteAction}
      />
      <MenubarComponent
        articlesCount={articlesCount}
        categories={categories}
        setCategories={setCategories}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Container>
        <HeaderComponent
          TABLE_COLUMNS={TABLE_COLUMNS_FOR_DROPDOWN}
          search={search}
          setSearch={setSearch}
        />
        <Typography style="h3">
          {articlesCount?.Draft + articlesCount?.Published} Articles
        </Typography>
        <NeetoUITable
          allowRowClick
          className="contact-table w-max-[75vw]"
          columnData={TABLE_COLUMNS_FOR_TABLE}
          rowData={filteredArticles}
          onRowClick={(event, article) => {
            setSelectedArticle(article);
            handleActionClick(event, article);
          }}
        />
      </Container>
    </div>
  );
}

export default Articles;
