// file: src/routes/auth.routes.ts

import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware"; // Assuming path
import { loginRateLimiter } from "../middleware/rateLimit.middleware"; // Assuming path
import { validate } from "../middleware/validation.middleware"; // Assuming path
import Joi from "joi"; // NOTE: Joi must be installed (npm install joi)

const router = Router();

// --- Joi Schemas (for validation) ---
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profileUrl: Joi.string().uri().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
// -------------------------------------

router.post("/register", validate(registerSchema), register);
router.post("/login", loginRateLimiter, validate(loginSchema), login);
router.post("/logout", authenticate, logout); // Logout requires a valid token

export default router;