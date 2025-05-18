const express = require("express");
const {
  registerUser,
  registeredUser,
  findUser,
  updateUser,
  deleteUser,
  userSingleRow,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.get("/getUser", registeredUser);
router.get("/findUser/:id", findUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/singleUser/:id",userSingleRow)

module.exports = router;
