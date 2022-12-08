const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

//token function so dont have to repeat code
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //regex for checking if email is valid
    const checkEmail = /\S+@\S+.\S+/;
    // check if email is valid and password length atleast 8
    if (checkEmail.test(email) && password.length > 8) {
      let user = await User.findOne({ email });
      if (!user) {
        const createUser = new User({
          email: email,
          password: password,
        });
        //token
        const token = signToken(createUser._id);

        await User.create(createUser);
        res.status(201).json({
          message: "User Created",
          token,
          data: {
            user: createUser,
          },
        });
      } else {
        res.status(403).json({ error: "User already exists" });
      }
    } else {
      res.status(406).send({ error: "Email or password not acceptable" });
    }
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if email and password exist
    if (!email || !password) {
      //call next so login function finish right away
      return next(
        res.status(400).json({ error: "Please provide email and password!" })
      );
    }
    //check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");
    //if user does not exist it stops there , if user exist it runs entire code
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        res.status(401).json({
          error: "Incorrect email or password",
        })
      );
    }
    //if everything ok ,send token to client
    const token = signToken(user._id);
    //  put token into cookie
    res.cookie("jwt", token, {
      expires: new Date(
        // convert time in milliseconds
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      //when using HTTPS then cookie will be created then use secure: true
      // secure: true,
      httpOnly: true,
    });
    //remove password from output
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
};
