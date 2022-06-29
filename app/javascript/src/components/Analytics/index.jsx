import React, { useEffect, useState } from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import articlesApi from "apis/articles";
import Navbar from "common/Navbar";

import { TABLE_COLUMNS } from "./constants";

function Analytics() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  const fetchArticles = async () => {
    try {
      const res = await articlesApi.list({ page: currentPage });
      setArticles([...res.data.articles]);
      setTotalArticlesCount(res.data.count.draft + res.data.count.published);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <div className="analytics-container w-full py-8">
        <div className="mx-auto w-8/12">
          <NeetoUITable
            allowRowClick
            columnData={TABLE_COLUMNS}
            rowData={articles}
          />
          <div className="mt-4 ">
            <Pagination
              count={totalArticlesCount}
              navigate={page => setCurrentPage(page)}
              pageNo={currentPage}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
