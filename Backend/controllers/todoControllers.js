import todoModel from "../models/todoModel.js";
import userModel from "../models/userModel.js";

export const create = async (req, res) => {
  const { title, descption } = req.body;

  if (!title || !descption) return res.json({ error: "All feild requied" });

  await todoModel.create({
    title,
    descption,
    todoBy: req.user.userID,
  });

  res.json({ message: "todo created" });
};

export const alltodos = async (req, res) => {
  const todos = await todoModel.find({ todoBy: req.user.userID });

  res.json(todos);
};

export const deletetodo = async (req, res) => {
  const postID = req.params.id;
  await todoModel.findByIdAndDelete({ _id: postID });
  res.json({ message: "todo deleted" });
};

export const edittodo = async (req, res) => {
  const { edittitle, editDescption } = req.body;

  if (!edittitle && !editDescption)
    return res.json({ error: "All feild need to fill" });
  const todo = await todoModel.findOne({ _id: req.params.id });
  const ownertodo = await userModel.findOne({ _id: req.user.userID });

  if (!todo) return res.json({ error: "no todo" });

  if (todo.todoBy.toString() === ownertodo._id.toString()) {
    await todoModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: edittitle || todo.title,
        descption: editDescption || todo.description,
        updated: Date.now(),
      }
    );
  }

  return res.json({ message: "Edit successfull" });
};
