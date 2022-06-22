import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Header from "./Header";
import Sidebar from "./Sidebar";

function EUI() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await articlesApi.show(slug);
      setArticle(response.data.article);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  return (
    <>
      <Header />
      <div className="flex" style={{ minHeight: "calc(100vh - 4rem)" }}>
        <div className="sidebar-container w-1/5 border-r-2 p-4">
          <Sidebar selectedArticleCategory={article?.category} />
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
                    {article?.category}
                  </span>
                )}
                {article?.created_at}
              </div>
              <div>
                <Typography style="body2">{article?.description}</Typography>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EUI;
