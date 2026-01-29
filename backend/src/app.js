import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import claimRoutes from "./routes/claim.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);

// Global error handler (required)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal server error"
  });
});

export default app;
