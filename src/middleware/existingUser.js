import { Users } from "../dbase/models";

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
export const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await Users.findOne({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.json(409).json({
        statusBar: "failed",
        messAGE: "Authentication failed",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
