import React from "react";

import { Typography, Pagination as NeetoUIPagination } from "neetoui";

function Pagination({ currentPage, setCurrentPage, totalArticlesCount }) {
  return (
    <div className="mt-4 flex items-center justify-between px-4">
      <Typography style="h5">
        Showing {(currentPage - 1) * 10 + 1}-
        {currentPage * 10 < totalArticlesCount
          ? currentPage * 10
          : totalArticlesCount}{" "}
        of {totalArticlesCount}
      </Typography>
      <NeetoUIPagination
        count={totalArticlesCount}
        navigate={page => setCurrentPage(page)}
        pageNo={currentPage}
        pageSize={10}
      />
    </div>
  );
}

export default Pagination;
