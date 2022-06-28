import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { Right, Down } from "neetoicons";
import { Typography } from "neetoui";
import { useHistory, useLocation } from "react-router-dom";

import categoriesApi from "apis/categories";

function Sidebar({ selectedArticleCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setSelectedCategory(selectedArticleCategory);
  }, [selectedArticleCategory]);

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.listArticlesByCategories();
      setCategories([...res.data.categories]);
    } catch (err) {
      logger.err(err);
    }
  };

  const handleSelectedCategory = name => {
    name === selectedCategory
      ? setSelectedCategory("")
      : setSelectedCategory(name);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="p-4">
      {categories.map(category => (
        <div key={category.value} className="mb-2 cursor-pointer">
          <div
            className="mb-1 flex items-center space-x-2 text-lg font-medium"
            onClick={() => handleSelectedCategory(category.label)}
          >
            {selectedCategory === category.label ? (
              <Down size={16} />
            ) : (
              <Right size={16} />
            )}
            <p>{category.label}</p>
          </div>
          <div className="space-y-2 pl-6 font-medium text-gray-500">
            {selectedCategory === category.label &&
              category.articles.map(article => (
                <div
                  key={article.slug}
                  className={classNames("cursor-pointer", {
                    "text-indigo-600":
                      article.slug === location.pathname.split("/")[2],
                  })}
                  onClick={() => history.push(`/articles/${article.slug}`)}
                >
                  <Typography variant="h6">{article.title}</Typography>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
