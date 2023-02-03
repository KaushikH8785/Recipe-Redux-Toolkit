import React from "react";
import AddRecipe from "../features/recipes/addRecipe";
import RecipeList from "../features/recipes/recipeList";

const Home = () => {
  return (
    <>
      <AddRecipe />
      <RecipeList />
    </>
  );
};

export default Home;
