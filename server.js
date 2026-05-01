import dotenv from "dotenv";
dotenv.config();

import express from "express";
import recipes from "./data/recipes.js"
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//secure
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// Running API
app.get("/", (req,res)=>{
  res.json({message: "Running API"})
});

// 一覧API取得
app.get("/recipes", (req,res)=>{
  res.json(recipes);
});

// 詳細API取得
app.get("/recipes/:id", (req,res)=>{
  const id = Number(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if(!recipe){
    return res.status(404).json({message: "Not Found ID"});
  }

  res.json(recipe);
});

// データ追加
app.post("/recipes", checkAuth, (req, res) => {
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// データの更新
app.patch("/recipes/:id", (req, res) => {
  // ID
  const id = Number(req.params.id);
  // 対象IDの検索
  const recipe = recipes.find(r => r.id === id);

  // 対象のIDデータがないときの処理
  if(!recipe){
    return res.status(404).json({message: "Not Found Update ID"});
  }

  // 更新処理(部分更新)
  const { title, ingredients, image} = req.body;

  if (title !== undefined) recipe.title = title;
  if (ingredients !== undefined) recipe.ingredients = ingredients;
  if (image !== undefined) recipe.image = image;

  res.json(recipe);

});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});