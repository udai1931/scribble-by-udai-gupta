import React, { useEffect, useState } from "react";

import { Table as NeetoUITable, Pagination } from "neetoui";

import articlesApi from "apis/articles";
import Navbar from "common/Navbar";

import { TABLE_COLUMNS } from "./constants";

function Analytics() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = async () => {
    try {
      const res = await articlesApi.list();
      setArticles([...res.data.articles]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const si = (currentPage - 1) * 10;
  const ei = Number(si) + 10;
  const filteredArticles = articles.slice(si, ei);

  return (
    <div>
      <Navbar />
      <div className="analytics-container w-full py-8">
        <div className="mx-auto w-8/12">
          <NeetoUITable
            allowRowClick
            columnData={TABLE_COLUMNS}
            rowData={filteredArticles}
          />
          <div className="mt-4 ">
            <Pagination
              count={200}
              navigate={handlePageChange}
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
