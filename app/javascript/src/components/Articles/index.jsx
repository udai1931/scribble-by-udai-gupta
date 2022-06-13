import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { TABLE_COLUMNS_FOR_DROPDOWN } from "./constants";
import HeaderComponent from "./HeaderComponent";
import MenubarComponent from "./MenubarComponent";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    fetchArticles();
  }, [selectedTab]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <MenubarComponent
        articlesCount={articlesCount}
        categories={categories}
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
        {filteredArticles.map(article => (
          <div key={article.id}>
            <p>{article.name}</p>
            <p>{article.description}</p>
            <p>{article.created_at}</p>
            <p>{article.author}</p>
            <p>{article.category}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Articles;
