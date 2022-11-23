import express from "express";
import gtController from "../controllers/gtcontroller";

const router = express.Router();

router.get("/", gtController.serverHealthCheck);
router.post("/create-record", gtController.createRecord);
router.get("/get-records", gtController.getAllGtAccounts);
router.get("/get-single-record", gtController.getAccountCreated);
export = router;
