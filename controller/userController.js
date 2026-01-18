import { User } from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;

    const user = await User.create({
      username,
      email,
      password,
      role_id
    });

    res.status(201).json({
      message: "User created",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
