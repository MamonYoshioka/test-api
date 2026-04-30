import express from "express";

const app = express();
app.use(express.json());





// 動作確認
app.get("/", (req, res)=>{
  res.json({message: "Running API"})
});

// サンプルAPI
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API" });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});