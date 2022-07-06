import React from "react";

import { Delete, Edit } from "neetoicons";
import { Link } from "react-router-dom";

import { startCase } from "utils/changeCase";

export const MENUBAR_ITEMS = ["All", "draft", "published"];

export const TABLE_COLUMNS_FOR_DROPDOWN = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    width: "20%",
  },
  {
    dataIndex: "author",
    key: "author",
    title: "Author",
    width: "20%",
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
    width: "20%",
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
    width: "20%",
  },
];

export const TABLE_COLUMNS_FOR_TABLE = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    render: (title, obj) => (
      <Link to={`/articles/edit/${obj.slug}`}>
        <div className="font-medium text-indigo-600">{title}</div>
      </Link>
    ),
  },
  {
    dataIndex: "user",
    key: "user",
    title: "Author",
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
  },
  {
    dataIndex: "category",
    key: "category",
    title: "Category",
    render: category => category.label,
  },
  {
    dataIndex: "state",
    key: "state",
    title: "Status",
    render: state => (
      <div className="flex space-x-2">{state && startCase(state)}</div>
    ),
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "",
    render: () => (
      <div className="flex space-x-2">
        <Delete className="delete" action="delete" />
        <Edit className="edit" action="edit" />
      </div>
    ),
  },
];
