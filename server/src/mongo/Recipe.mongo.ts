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
      author: id,
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

export async function getRecipe(id: string) {
  try {
    const recipe = await Recipe.findById(id);

    if (recipe && recipe._id) {
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

export async function editRecipe(id: string, data: Partial<IReciepe>) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, data, { new: true });

    if (recipe && recipe._id) {
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

export async function getRecipes(page: number, limit: number, search: string) {
  try {
    const skip: number = (page - 1) * limit;

    const searchfilter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $in: [new RegExp(search, "i")] } },
      ],
    };

    const recipes = await Recipe.find(searchfilter)
      .populate("author", "userName email")
      .skip(skip)
      .limit(limit)
      .exec();

    if (recipes && recipes.length > 0) {
      return {
        error: false,
        data: {
          page,
          limit,
          search,
          recipes,
        },
      };
    } else {
      return {
        error: false,
        data: [],
      };
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}
