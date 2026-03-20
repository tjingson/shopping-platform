require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.set("trust proxy", 1);
app.use(cookieParser());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (
//         !origin ||
//         origin === "http://localhost:5173" ||
//         origin === "https://shopping-platform-rc25.vercel.app"
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   })
// );
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working, Josh!");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});