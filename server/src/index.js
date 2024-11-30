import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createPost,
  fetchAllPosts,
  fetchUserPosts,
  fetchSinglePost,
  deletePosts,
} from "./controllers/post.controllers.js";
import verifyToken from "./middleware/verifyToken.js";
import {
  createProfile,
  getUserProfile,
} from "./controllers/profile.controllers.js";

const app = express();
const client = new PrismaClient();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"], // Adjust to match your frontend origin
    methods: ["POST", "PATCH", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

// Registration Endpoint
app.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check required fields
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user with the same email or username
    const userWithEmail = await client.user.findFirst({ where: { email } });
    if (userWithEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const userWithUsername = await client.user.findFirst({
      where: { username },
    });
    if (userWithUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user
    const newUser = await client.user.create({
      data: { firstName, lastName, username, email, password: hashedPassword },
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Endpoint
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await client.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(user.id, process.env.JWT_SECRET); // Issue: The first argument must be an object (see fix below)

    console.log("User logged in successfully");

    // Send response with token in cookie
    res
      .status(200)
      .cookie("authToken", token, { httpOnly: true, secure: true }) // Use `secure: false` for local development
      .json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

app.post("/user/profile", verifyToken, createProfile);
app.get("/user/:id/profile", verifyToken, getUserProfile);

//routes

app.post("/posts", verifyToken, createPost);
app.get("/posts/user/:userId", verifyToken, fetchUserPosts);
app.get("/posts/:id", verifyToken, fetchSinglePost);
app.get("/posts", verifyToken, fetchAllPosts);
app.delete("/posts/postId", verifyToken, deletePosts);

// Start server
app.listen(4000, () => console.log(`Server running on port 4000...`));
