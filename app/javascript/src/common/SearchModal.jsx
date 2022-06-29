import React from "react";

import { Search, Close } from "neetoicons";
import { Input } from "neetoui";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

function SearchModal({ search, setSearch, setShowSearchModal, articles }) {
  const modalRoot = document.getElementById("modal-root");
  const history = useHistory();

  const handleClick = article => {
    setShowSearchModal(false);
    history.push(`/articles/${article.slug}`);
  };

  return ReactDOM.createPortal(
    <div className="absolute top-0 z-20 h-screen w-screen justify-center bg-gray-300 bg-opacity-75">
      <div className="search-modal relative mx-auto w-4/12 rounded-md">
        <div className="flex items-center bg-white px-2">
          <Input
            placeholder="Search article"
            size="large"
            nakedInput={true}
            prefix={<Search size={20} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Close
            className="cursor-pointer"
            onClick={() => setShowSearchModal(false)}
          />
        </div>
        <div className="h-64 overflow-auto">
          {articles.map(article => (
            <div
              key={article.slug}
              className="border flex cursor-pointer items-center bg-white px-8 py-4 text-lg font-medium"
              onClick={() => handleClick(article)}
            >
              {article.title}{" "}
              <span className="ml-2 rounded-md bg-indigo-400 px-2 text-sm text-white">
                {article.category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default SearchModal;
