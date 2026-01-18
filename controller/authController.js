import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import { Role } from "../model/Role.js";
import { authConfig } from "../config/server.config.js";

const JWT_SECRET = authConfig.JWT_SECRET; 

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // find role_id
    const roleData = await Role.findOne({ where: { role_name: role } });
    if (!roleData) {
      return res.status(400).json({ message: "Invalid role" });
    }
    // console.log(roleData)
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role_id: roleData.role_id
    });

    res.status(201).json({ success: true, message: "Signup successful", user });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ error: err });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: Role
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, role: user.role.role_name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.role_name
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
