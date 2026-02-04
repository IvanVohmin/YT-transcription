import { Router } from "express";
import translateRouter from "./api/translation.route.js";

const router = Router();

router.use("/v1", translateRouter);

export { router };
