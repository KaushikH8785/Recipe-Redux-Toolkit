import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  editRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipeList",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
      // console.log(current(state).recipes)
    },
    removeRecipe: (state, action) => {
      const { id } = action.payload;
      const existingRecipe = state.recipes.find((item) => item.id === id);
      // const existingRecipe = state.recipes.find((item) => item.id === id);
      // console.log("removeRecipe--->", state)
      if (existingRecipe) {
        state.recipes = state.recipes.filter((item) => item.id !== id);
      }
      //console.log(existingRecipe);
    },
    editRecipeList: (state, action) => {
      //console.log(action.payload)
      state.editRecipe = action.payload;
      //const { id } = action.payload
      //console.log("match-->", editRecipe)
      // console.log(current(state).recipes)
    },
    updateRecipe: (state, action) => {
      const index = state.recipes.findIndex(
        (item) => item.id === action.payload.id
      );
      //console.log("match-->", action.payload)
      if (index > -1) {
        const updateRecipe = { ...state.recipes[index], ...action.payload };
        state.recipes[index] = updateRecipe;
      }
      //state.editRecipe = null;
    },
    saveRcpIngredient: (state, action) => {
      const { id, inIdx, updateIngredient } = action.payload;
      //console.log(id, inIdx, updateIngredient);
      // Find Recipe Index
      const index = state.recipes.findIndex((item) => item.id === id);
      // console.log(index);
      // console.log(current(state).recipes[index].ingredientName);
      state.recipes[index].ingredientName[inIdx] = updateIngredient;
    },
    removeRcpIngredient: (state, action) => {
      const { id, inIdx } = action.payload;
      console.log(id, inIdx);
      const index = state.recipes.findIndex((item) => item.id === id);
      if (index > -1) {
        state.recipes[index].ingredientName.splice(inIdx, 1);
      }
    },
  },
});

export const {
  addRecipe,
  removeRecipe,
  updateRecipe,
  editRecipeList,
  saveRcpIngredient,
  removeRcpIngredient,
} = recipeSlice.actions;

export default recipeSlice.reducer;
