const router = require("express").Router();
const { createUser, login, getSingleUser } = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
// /api/user for user signup
router.route("/").post(createUser)

// /api/user/login for user login
router.route("/login").post(login);

// /api/user/me to get single user data
router.route('/me').get(authMiddleware, getSingleUser);





//
const UserModel = require('../../models/User'); 

router.get('/getusers', (req, res) => {
  UserModel.find()
    .then(users => res.json(users))
    .catch(error => res.json(error));
});

//

module.exports = router;
