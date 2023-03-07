import Role from "../models/Role"
import User from "../models/User"

import bcrypt from "bcryptjs"

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "visit" }).save(),
    ]);
    
    // create Admin
    const user = await User.findOne({ email: process.env.ACCOUNT_EMAIL });
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
      // create a new admin user
      await User.create({
        name: process.env.ACCOUNT_USERNAME,
        email: process.env.ACCOUNT_EMAIL,
        valid: true,
        password: await bcrypt.hash(process.env.ACCOUNT_PASSWORD, 10),
        roles: roles.map((role) => role._id),
      });
      console.log('Initial parameters Created!')
    }

    
  } catch (error) {
    console.error(error);
  }
}