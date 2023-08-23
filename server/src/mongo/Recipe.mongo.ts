import { IReciepe } from "../interfaces/Recipe.Interface";
import Recipe from "../model/Reciepe";
import User from "../model/User";

export async function createRecipe(id: string, data: Partial<IReciepe>) {
  try {
    const recipe = await Recipe.create({
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      steps: data.steps,
      imageUrl: data.imageUrl,
      autor: id,
    });

    if (recipe && recipe._id) {
      await User.findByIdAndUpdate(
        id,
        {
          $push: { recipes: recipe._id },
        },
        { new: true }
      );
      return {
        error: false,
        data: recipe,
      };
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}
