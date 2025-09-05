import "dotenv/config";
import express from "express";

const app = express();

app.get("/api", (_, res) => {
  res.json({ message: "Hello from the backend!", NODE_ENV: process.env.NODE_ENV });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});