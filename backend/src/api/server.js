import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/database/users", userRoutes);

async function main() {
  await mongoose.connect(
    "mongodb+srv://filipec953_db_user:fip@users.naukp7u.mongodb.net/",
  );
}

// Connect to MongoDB
main().catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`),
);

// mongodb+srv://filipec953_db_user:p9XBkvomD0MbbJtF@users.naukp7u.mongodb.net/
