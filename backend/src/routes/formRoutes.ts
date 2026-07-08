import express from "express";
import { submitForm } from "../controllers/formController";

const router = express.Router();

router.post("/", submitForm);

export default router;