import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addRecipe } from "./recipeSlice";
import { updateRecipe } from "./recipeSlice";

const AddRecipe = () => {
  // Form field value set
  function FormData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [data, setData] = useState({
    recipeName: "",
    ingredientName: "",
  });

  const dispatch = useDispatch();
  const editRecipeData = useSelector((store) => store.recipeList.editRecipe);

  useEffect(() => {
    if (editRecipeData) {
      setData({
        ...data,
        id: editRecipeData.id,
        recipeName: editRecipeData.recipeName,
        ingredientName: editRecipeData.ingredientName.join(","),
      });
      setAction("edit");
    }
  }, [editRecipeData]);

  const [action, setAction] = useState("");

  const ingreNamesComma = data.ingredientName;
  const ingreArr = ingreNamesComma.toString().split(",");
  data.ingredientName = ingreArr;

  const handleOnClick = (e) => {
    e.preventDefault();
    if (data.recipeName === "" || data.ingredientName === "") {
      alert("Please Fill Recipe Details");
    } else {
      data["id"] = uuidv4();
      dispatch(addRecipe(data));
      setData({ recipeName: "", ingredientName: "" });
    }
    
  };
  const handleUpdateRecipe = () => (e) => {
    e.preventDefault();
    if (data.recipeName === "" || data.ingredientName === "") {
      alert("Please Fill Recipe Details");
    } else {
      dispatch(updateRecipe(data));
      setData({ recipeName: "", ingredientName: "" });
      setAction();
    }    
  };

  return (
    <>
      <h2>Recipe Title</h2>
      <div className="addWrapper" id="addcontainer">
        <div className="addBox">
          <h5>Recipe name:</h5>
          <input
            onChange={FormData}
            name="recipeName"
            id="recipeName"
            value={data.recipeName}
          />
          <h5>
            Ingredients <small>Seperate them via commas</small>
          </h5>
          <input
            onChange={FormData}
            name="ingredientName"
            id="ingredientName"
            value={data.ingredientName}
          />
          {action === "edit" ? (
            <button
              className="btn btn-danger"
              id="add-recipe"
              onClick={handleUpdateRecipe()}
            >
              Update Recipe
            </button>
          ) : (
            <button
              className="btn btn-danger"
              id="add-recipe"
              onClick={handleOnClick}
            >
              Add Recipe
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
