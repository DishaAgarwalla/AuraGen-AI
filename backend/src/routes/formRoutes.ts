import express from "express";
import { getForm } from "../controllers/formController";

const router = express.Router();

/*
====================================
GET /api/form
Returns current form
====================================
*/

router.get("/", getForm);

export default router;