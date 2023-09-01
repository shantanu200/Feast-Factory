import { Comment } from "../interfaces/User.Interface";
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
    const recipe = await Recipe.findById(id).populate(
      "author",
      "userName email recipes"
    );

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

export async function createComment(id: string, data: Comment) {
  try {
    const { author, comment } = data;

    const insertComment = await Recipe.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            author,
            comment,
          },
        },
      },
      { new: true }
    );

    if (insertComment) {
      return {
        error: false,
        data: insertComment,
      };
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}

export async function createReply(id: string, data: any) {
  try {
    const { author, comment, commentID } = data;

    const replyComment = await Recipe.findOneAndUpdate(
      {
        _id: id,
        "comments._id": commentID,
      },
      {
        $push: {
          "comments.$.replies": {
            author,
            comment,
          },
        },
      },
      { new: true }
    )
      .populate("comments.replies.author")
      .exec();

    if (replyComment) {
      return {
        error: false,
        data: replyComment,
      };
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}

export async function getReplies(id: string, commentID: string) {
  try {
    const replies = await Recipe.findOne(
      {
        _id: id,
      },
      { comments: { $elemMatch: { _id: commentID } } }
    )
      .populate("comments.replies.author", "_id userName")
      .exec();

    if (replies) {
      return {
        error: false,
        data: replies,
      };
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}

export async function getAllCommnets(id: string, count: number) {
  try {
    const commentData = await Recipe.findById(id)
      .select({
        comments: { $slice: count },
      })
      .populate("comments.author comments.replies.author", "_id userName")
      .exec();

    if (commentData) {
      return {
        error: false,
        data: commentData.comments,
      };
    } else {
      return;
    }
  } catch (error) {
    return {
      error: false,
      data: error,
    };
  }
}
