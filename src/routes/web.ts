import express from "express";

const router = express.Router();

// ROUTES

router.get("/", (req, res) => {
   res.send("welcome to church 52");
});

export default router;



