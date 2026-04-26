import "dotenv/config";
import express from "express";
import contact from "./routes/contact";

const app = express();

app.set("trust proxy", 3);

app.use(express.json({ limit: "32kb" }));

app.get(`/api`, (_, res) => {
  res.json({
    message: `Hello from the backend!`,
    NODE_ENV: process.env.NODE_ENV,
  });
});

app.use("/api/contact", contact);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:` + PORT);
});
