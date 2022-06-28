import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Edit, Delete, Minus } from "neetoicons";
import { Typography } from "neetoui";
import { Alert } from "neetoui";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";
import Input from "common/Input";

function CategoriesSettings() {
  const [categories, setCategories] = useState([]);
  const [newCategoryToggle, setNewCategoryToggle] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryToggle, setEditCategoryToggle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState(
    {}
  );
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
      setNewCategory("");
      setNewCategoryToggle(false);
      fetchCategories();
    } catch (err) {
      logger.error(err);
    }
  };

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: editCategoryToggle,
        payload: { name: editCategory },
      });
      setEditCategory("");
      setEditCategoryToggle("");
      fetchCategories();
    } catch (err) {
      logger.error(err);
    }
  };

  const deleteCategory = async () => {
    try {
      await categoriesApi.destroy({ id: selectedCategoryForDelete.value });
      setShowAlert(false);
      setSelectedCategoryForDelete({});
      fetchCategories();
    } catch (err) {
      logger.error(err);
    }
  };

  const handleEditClick = category => {
    setEditCategoryToggle(category.value);
    setEditCategory(category.label);
  };

  const handleDeleteClick = category => {
    setSelectedCategoryForDelete(category);
    setShowAlert(true);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
    updateCategoriesPosition(items);
  }

  const updateCategoriesPosition = async items => {
    try {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        if (item.index === index + 1) return;
        await categoriesApi.update({
          id: item.value,
          payload: { position: index + 1 },
        });
      }
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <div className="my-8 w-6/12">
      <Alert
        isOpen={showAlert}
        size="sm"
        title="Delete Category"
        message={`Are you sure you want to delete this category with name "${selectedCategoryForDelete?.name}"? It will also deleted the ${selectedCategoryForDelete.count} articles belonging to this category. This action is irreversible.`}
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {provided => (
            <div
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((category, idx) => (
                <Draggable
                  key={category.label}
                  draggableId={category.label}
                  index={idx}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-auto flex h-16 items-center border-t-2 px-4"
                    >
                      <div className="flex space-x-4 font-semibold">
                        <Minus />
                        {editCategoryToggle !== category.value && (
                          <p>{category.label}</p>
                        )}
                        <Input
                          collapse={editCategoryToggle === category.value}
                          value={editCategory}
                          setValue={setEditCategory}
                          handleSubmit={updateCategory}
                        />
                      </div>
                      <div className="ml-auto flex cursor-pointer space-x-2">
                        <Delete
                          size={20}
                          onClick={() => handleDeleteClick(category)}
                        />
                        <Edit
                          size={20}
                          onClick={() => handleEditClick(category)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default CategoriesSettings;
