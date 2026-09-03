import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../services/authService.js";
import { findUserById } from "../repositories/usersRepository.js";

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json(user);

  } catch (error) {
    //Catches error and checks witch error was thrown
    if (error.message === "INVALID_REGISTRATION_DATA") {
      return res.status(400).json({
        message: "Name, email, password and team are required",
      });
    }

    if (error.message === "PASSWORD_TOO_SHORT") {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    if (error.message === "INVALID_TEAM") {
      return res.status(400).json({
        message: "Invalid team",
      });
    }

    console.error("Registration failed:", error);

    return res.status(500).json({
      message: "Failed to register user",
    });
  }
}

export async function login(req, res) {
  try {
    const user = await loginUser(req.body);

    //Saves user.id inside session object
    req.session.userId = user.id;

    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "INVALID_LOGIN_DATA") {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.error("Login failed:", error);

    return res.status(500).json({
      message: "Failed to login",
    });
  }
}

export async function me(req, res) {
  try {
    const user = await getCurrentUser(req.session.userId);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch current user:", error);

    return res.status(500).json({
      message: "Failed to fetch current user",
    });
  }
}

export async function logout(req, res) {
    //deletes from db
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout failed:", error);

      return res.status(500).json({
        message: "Failed to logout",
      });
    }
    //Deletes cookie wich stores the session id
    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  });
}