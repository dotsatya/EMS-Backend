import { Role } from "../model/Role.js";

export const createRole = async (req, res) => {
  try {
    const role = await Role.create({
      role_name: "admin"
    });

    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
