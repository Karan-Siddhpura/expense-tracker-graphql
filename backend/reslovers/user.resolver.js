import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("user already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error(`Error in Sign Up ${err}`);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.error(`Error in Login ${err}`);
        throw new Error(err.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error(`Error in Logout ${err}`);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error(`Error in authuser ${err}`);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findOneById(userId);
        return user;
      } catch (error) {
        console.error(`Error in user query ${err}`);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};
export default userResolver;
