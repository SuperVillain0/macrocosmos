const { Signup, Login } = require("../controllers/authController");
const { getList, userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getlist", getList);
router.post("/", userVerification);

module.exports = router;
