import express from "express";
import {
  loginUser,
  getAuthers,
  getAuthorbyId,
  updateAuthorById,
  deleteAuthorById,
} from "../Controller/AuthController.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/author", getAuthers);
router.get("/author/:id", getAuthorbyId);
router.patch("/author/:id", updateAuthorById);
router.delete("/author/:id", deleteAuthorById);

export default router;
