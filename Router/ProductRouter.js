import express from "express";
import {
  Addbooks,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../Controller/ProductController.js";

const router = express.Router();

router.post("/book", Addbooks);
router.get("/book", getBooks);
router.get("/book/:id", getBookById);
router.patch("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);

export default router;
