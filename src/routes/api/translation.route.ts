import { Router } from "express";
import { getTranslation } from "../../controllers/translate.controller.js";

const translateRouter = Router();

translateRouter.post("/translate", getTranslation);

export default translateRouter;