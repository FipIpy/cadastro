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
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("A variável MONGODB_URI não foi definida.");
  }

  await mongoose.connect(mongoUri);

  app.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`),
  );
}

main().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err.message);
  process.exitCode = 1;
});
