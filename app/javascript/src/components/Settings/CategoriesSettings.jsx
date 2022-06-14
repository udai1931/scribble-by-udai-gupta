import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Edit, Delete, Minus } from "neetoicons";
import { Typography } from "neetoui";
import { Alert } from "neetoui";

import categoriesApi from "apis/categories";
import Input from "common/Input";

function CategoriesSettings() {
  const [categories, setCategories] = useState([]);
  const [newCategoryToggle, setNewCategoryToggle] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryToggle, setEditCategoryToggle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] =
    useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.list();
      setCategories([...res.data.categories]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    try {
      await categoriesApi.create({ name: newCategory });
    } catch (err) {
      logger.error(err);
    } finally {
      setNewCategory("");
      setNewCategoryToggle(false);
      fetchCategories();
    }
  };

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: editCategoryToggle,
        payload: { name: editCategory },
      });
    } catch (err) {
      logger.error(err);
    } finally {
      setEditCategory("");
      setEditCategoryToggle("");
      fetchCategories();
    }
  };

  const deleteCategory = async () => {
    try {
      await categoriesApi.destroy({ id: selectedCategoryForDelete });
    } catch (err) {
      logger.error(err);
    } finally {
      setShowAlert(false);
      setSelectedCategoryForDelete("");
      fetchCategories();
    }
  };

  const handleEditClick = category => {
    setEditCategoryToggle(category.id);
    setEditCategory(category.name);
  };

  const handleDeleteClick = category => {
    setSelectedCategoryForDelete(category.id);
    setShowAlert(true);
  };

  return (
    <div className="my-8 w-6/12">
      <Alert
        size="sm"
        isOpen={showAlert}
        title="Delete Category"
        message="Are you sure you want to delete? This action is irreversible."
        onClose={() => setShowAlert(false)}
        onSubmit={deleteCategory}
      />
      <Typography style="h2">Manage Categories</Typography>
      <Typography style="body1">
        Create and configure the categories inside your scribble
      </Typography>
      <div
        className="w-60 mt-5 mb-2 flex cursor-pointer items-center px-4 text-indigo-600"
        onClick={() => setNewCategoryToggle(prev => !prev)}
      >
        {!newCategoryToggle && (
          <>
            <Plus size={16} />
            <Typography style="body1" className="ml-2">
              Add new category
            </Typography>
          </>
        )}
      </div>
      <Input
        collapse={newCategoryToggle}
        value={newCategory}
        setValue={setNewCategory}
        handleSubmit={createCategory}
      />
      {categories.map(category => (
        <div
          key={category.name}
          className="my-auto flex h-16 items-center border-t-2 px-4"
        >
          <div className="flex space-x-4 font-semibold">
            <Minus />
            {editCategoryToggle !== category.id && <p>{category.name}</p>}
            <Input
              collapse={editCategoryToggle === category.id}
              value={editCategory}
              setValue={setEditCategory}
              handleSubmit={updateCategory}
            />
          </div>
          <div className="ml-auto flex cursor-pointer space-x-2">
            <Delete size={20} onClick={() => handleDeleteClick(category)} />
            <Edit size={20} onClick={() => handleEditClick(category)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesSettings;
