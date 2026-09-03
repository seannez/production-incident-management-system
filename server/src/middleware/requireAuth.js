//Checks if session exists
export default function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  //Defined in auth.routes: go to me in authcontroller
  next();
}

