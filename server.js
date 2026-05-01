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

app.get("/debug", (req, res) => {
  res.json({
    token: process.env.ADMIN_TOKEN || "undefined"
  });

  console.log("送信:", `[${req.headers.authorization}]`);
  console.log("正解:", `[${process.env.ADMIN_TOKEN}]`);
});



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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});