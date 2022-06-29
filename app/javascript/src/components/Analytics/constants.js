import React from "react";

import { startCase } from "utils/changeCase";

export const TABLE_COLUMNS = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    width: "30%",
    render: title => (
      <div className="font-medium text-indigo-600">{startCase(title)}</div>
    ),
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
    width: "20%",
  },
  {
    dataIndex: "category",
    key: "category",
    title: "Category",
    width: "30%",
    render: category => <div className="text-gray-600">{category.label}</div>,
  },
  {
    dataIndex: "visits",
    key: "visits",
    title: "Visits",
    width: "15%",
    render: visits => <div className="text-gray-600">{visits}</div>,
    sorter: (a, b) => a.visits - b.visits,
  },
];
