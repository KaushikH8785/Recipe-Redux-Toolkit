import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRecipeList } from "./recipeSlice";
import { removeRecipe } from "./recipeSlice";
import { saveRcpIngredient } from "./recipeSlice";
import { removeRcpIngredient } from "./recipeSlice";

const RecipeList = () => {
  const recipes = useSelector((store) => store.recipeList.recipes);
  const [toggle, setToggle] = useState(null);
  const [updateIngredient, setUpdateIngredient] = useState("");

  const dispatch = useDispatch();

  const updateIngredint = (id, inIdx, updateIngredient) => (e) => {
    e.preventDefault();
    if (updateIngredient === "") {
      alert("Please Fill Ingredient Name");
    } else {
      dispatch(saveRcpIngredient({ id, inIdx, updateIngredient }));
      setToggle(true);
    }    
  };

  //Cancel On Click Ingrediants
  const cancelOnClick = (e) => {
    e.preventDefault();
    setToggle(false);
  };

  const editIngredient = (id, inIdx, ingreName) => (e) => {
    e.preventDefault();
    setUpdateIngredient(ingreName);
    setToggle({ rcpId: id, inGreIdx: inIdx });
  };

  const removeIngredient = (id, inIdx) => (e) => {
    e.preventDefault();
    dispatch(removeRcpIngredient({ id, inIdx }));
  };

  const handleEditRecipe = (recipe, id) => (e) => {
    e.preventDefault();
    dispatch(editRecipeList(recipe, id));
    //setUpdateDataId(id)
    //console.log("RCP-->", recipe);
    //console.log("ID-->", id)
  };

  const handleRemoveRecipe = (id) => (e) => {
    e.preventDefault();
    dispatch(removeRecipe({ id }));
    //console.log(id);
  };

  //console.log("new", recipes)

  return (
    <>
      {recipes.map((recipe) => {
        const ingredientName = recipe.ingredientName;
        return (
          <ul className="added-recipe-block" key={recipe.id}>
            <li>
              <strong>Recipe Name: </strong> {recipe.recipeName}
            </li>
            <li>
              <strong>Ingredient: </strong>
              {ingredientName.map((ingreName, idx) => {
                return (
                  <div key={idx} className="ingre">
                    <div
                      style={{
                        display:
                          toggle &&
                          toggle.rcpId === recipe.id &&
                          toggle.inGreIdx === idx
                            ? "none"
                            : "inline-flex",
                      }}
                    >
                      {ingreName}
                    </div>
                    <div className="editingre">
                      <form
                        style={{
                          display:
                            toggle &&
                            toggle.rcpId === recipe.id &&
                            toggle.inGreIdx === idx
                              ? "block"
                              : "none",
                        }}
                        onSubmit={updateIngredint(
                          recipe.id,
                          idx,
                          updateIngredient
                        )}
                      >
                        <input
                          value={updateIngredient}
                          onChange={(e) => setUpdateIngredient(e.target.value)}
                        />
                        <button
                          className="btn save"
                          type="submit"
                          id="save-ingre"
                        >
                          Save
                        </button>
                        <button
                          className="btn cancel"
                          id="cancel-ingre"
                          onClick={cancelOnClick}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                    <div
                      className="ingre-edit-delete"
                      style={{
                        display:
                          toggle &&
                          toggle.rcpId === recipe.id &&
                          toggle.inGreIdx === idx
                            ? "none"
                            : "inline-flex",
                      }}
                    >
                      <div
                        className="editicon"
                        onClick={editIngredient(recipe.id, idx, ingreName)}
                      >
                        Edit
                      </div>
                      <div
                        className="removeingre"
                        onClick={removeIngredient(recipe.id, idx)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
            <li>
              <div
                className="edit"
                onClick={handleEditRecipe(recipe, recipe.id)}
              >
                Edit
              </div>
              <div className="delete" onClick={handleRemoveRecipe(recipe.id)}>
                Delete Recipe
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default RecipeList;
