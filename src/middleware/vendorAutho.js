import jwt from "jsonwebtoken";
import { VendorReq ,Users} from "../dbase/models";

export const Authorization = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "You are not logged in please login",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedUser = await Users.findByPk(decoded.id);
    // console.log(decoded);
    // console.log(loggedUser);
    if (!loggedUser) {
      return res.status(401).json({
        status: "failed",
        message: "Token has expired please login again",
      });
    }
    if (loggedUser.roleId !== 2) {
      return res.status(403).json({
        status: "failed",
        messase: "Only Vendors can Post Products",
      });
    } else {
      req.VendorReq = loggedUser;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      error:
        error.message +
        " or Please login again" +
        "token has expired please login again maybe",
    });
  }
};
