import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import SearchModal from "common/SearchModal";

import Header from "./Header";
import Sidebar from "./Sidebar";

function EUI() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await articlesApi.show(slug, true);
      setArticle(response.data.article);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list({ text: search });
      setArticles(response.data.articles);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      setShowSearchModal(true);
    } else if (e.key === "Escape") {
      setShowSearchModal(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (search) fetchArticles();
  }, [search]);

  return (
    <>
      {showSearchModal && (
        <SearchModal
          search={search}
          setSearch={setSearch}
          setShowSearchModal={setShowSearchModal}
          articles={articles}
        />
      )}
      <Header setShowSearchModal={setShowSearchModal} />
      <div className="flex" style={{ minHeight: "calc(100vh - 4rem)" }}>
        <div className="sidebar-container w-1/5 border-r-2 p-4">
          <Sidebar selectedArticleCategory={article?.category.label} />
        </div>
        <div className="component-container w-4/5 p-4">
          {loading ? (
            <PageLoader className="flex h-full w-full items-center justify-center" />
          ) : (
            <>
              <Typography style="h1" className="mb-4">
                {article?.title}
              </Typography>
              <div className="mb-4">
                {article && (
                  <span className="mr-4 rounded-md bg-indigo-200 py-1 px-2 text-sm font-medium text-indigo-600">
                    {article?.category?.label}
                  </span>
                )}
                {article?.created_at}
              </div>
              <div>
                <Typography style="body2">{article?.body}</Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EUI;
