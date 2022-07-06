import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { Table as NeetoUITable, Alert } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import Navbar from "common/Navbar";
import Pagination from "common/Pagination";

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
  const [unselectedColumns, setUnselectedColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  const history = useHistory();

  const fetchCountByState = async () => {
    try {
      const res = await articlesApi.countByState();
      setArticlesCount(res.data.count);
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchArticles = async (page = currentPage) => {
    try {
      let res;
      if (selectedTab === "All") {
        res = await articlesApi.list({ page });
      } else if (selectedTab === "draft" || selectedTab === "published") {
        res = await articlesApi.listByState({
          page: currentPage,
          payload: { article: { state: selectedTab } },
        });
      } else {
        res = await categoriesApi.listArticlesByCategory({
          id: selectedTab,
          page: currentPage,
        });
      }
      setArticles([...res.data.articles]);
      setTotalArticlesCount(res.data.count);
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
    setSelectedArticle(article);
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
      fetchCategories();
      fetchArticles();
      fetchCountByState();
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCountByState();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchArticles(1);
  }, [selectedTab]);

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredColumns = TABLE_COLUMNS_FOR_TABLE.filter(
    col => !unselectedColumns.includes(col.title)
  );

  return (
    <>
      <Navbar />
      <div className="articles-container flex">
        <Alert
          isOpen={showAlert}
          size="sm"
          title="Delete Article"
          message={`Are you sure you want to delete this article with the title "${selectedArticle?.title}" ? This action is irreversible.`}
          onClose={() => setShowAlert(false)}
          onSubmit={handleDeleteAction}
        />
        <div className="menubar-container fixed">
          <MenubarComponent
            articlesCount={articlesCount}
            categories={categories}
            setCategories={setCategories}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        <div className="table-container px-4">
          <HeaderComponent
            TABLE_COLUMNS={TABLE_COLUMNS_FOR_DROPDOWN}
            search={search}
            setSearch={setSearch}
            unselectedColumns={unselectedColumns}
            setUnselectedColumns={setUnselectedColumns}
            categories={categories}
          />
          <Typography style="h3">
            {articlesCount?.draft + articlesCount?.published} Articles
          </Typography>
          <NeetoUITable
            // allowRowClick
            columnData={filteredColumns}
            rowData={filteredArticles}
            onRowClick={(event, article) => {
              handleActionClick(event, article);
            }}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalArticlesCount={totalArticlesCount}
          />
        </div>
      </div>
    </>
  );
}

export default Articles;
