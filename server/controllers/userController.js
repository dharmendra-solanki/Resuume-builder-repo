// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModels.js";

// const generateToken = (userId) => {
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//     });
//     return token;
// }

// // controllers for user raguistration
// //Post:/api/ users/ register
// export const registerUser = async ( req , res)=>{
//     try {
//         const { name , email , password} = req.body;
//         //validation
//         if(!name || !email || !password){
//             return res.status(400).json({ message: "All fields are required"});
//         }
//         //check if user already exists
//         const user = await User.findOne({email})
//         if(user){
//             return res.status(400).json({ message: "User already exists"});
//         }
//         //create new user
//         const harshedPassword = await bcrypt.hash(password,10);
//         const newUser = new User.create({
//             name,
//             email,
//             password
//         });
//         await newUser.save();
//         // return success massage 

//         const token = generateToken(newUser._id);
//         newUser.password = undefined;

//         return res.status(201).json({
//             message: "User registered successfully", token,
//             user: newUser
//         });

//     } catch (error) {
//         return res.status(500).json({massage: error.message});
//     }
// }


// // controllers for user login
// //Post:/api/ users/login
// export const loginUser = async ( req , res)=>{
//     try {
//         const { email , password} = req.body;
//         //validation
//         if(!email || !password){
//             return res.status(400).json({ message: "All fields are required"});
//         }

//         //check if user exists
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(400).json({ message: "Invalid email or password"});
//         }

//         //check password is correct
//         if(!user.comparePassword(password)){
//             return res.status(400).json({ message: "Invalid email or password"});
//         }

//         // return success massage
//         const token = generateToken(user._id);
//         user.password = undefined;
//         return res.status(200).json({
//             message: "User logged in successfully", token,
//             user
//         });

//     } catch (error) {
//         return res.status(400).json({massage: error.message});
//     }
// }

// // controller for getting user by id
// //GET: /api/users/data

// export const getUserById = async ( req , res)=>{
//     try {
//         const userId = req.userId;

//         //check if user exists
//         const user = await user.findOne({ _id: userId })
//         if(!user){
//             return res.status(400).json({ message: "User not found"});
//         }
//         // return success massage
//         user.password = undefined;
//         return res.status(200).json({user});

//     } catch (error) {
//         return res.status(400).json({message: error.message});
//     }
// }


// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModels.js";
// import Resume from "../models/resume.js";

// // Generate JWT
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ================= REGISTER =================
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = generateToken(newUser._id);
//     newUser.password = undefined;

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: newUser,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ================= LOGIN =================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = generateToken(user._id);
//     user.password = undefined;

//     return res.status(200).json({
//       success: true,
//       message: "User logged in successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET USER =================
// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.userId; // comes from auth middleware

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.password = undefined;

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// //controller for getting user by id
// //GET: /api/users/resumes
// export const getUserResumes = async (req, res)=>{
//     try {
//         const userId = req.userId;

//         //return user resumes
//         const resumes = await Resume.find({userId });
//         return res.status(200).json({resumes});
//     }catch (error) {
//         return res.status(400).json({message: error.message});
//     }
// }


// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModels.js";
// import Resume from "../models/resume.js";

// // Generate JWT
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ================= REGISTER =================
// export const registerUser = async (req, res) => {
//   try {
//     // 🔧 FIX: name → username
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🔧 FIX: name → username
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = generateToken(newUser._id);
//     newUser.password = undefined;

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: newUser,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ================= LOGIN =================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = generateToken(user._id);
//     user.password = undefined;

//     return res.status(200).json({
//       success: true,
//       message: "User logged in successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET USER =================
// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.password = undefined;

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET USER RESUMES =================
// // GET: /api/users/resumes
// export const getUserResumes = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const resumes = await Resume.find({ userId });
//     return res.status(200).json({ resumes });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import Resume from "../models/resume.js";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    // Frontend-friendly user object
    const userResponse = {
      _id: newUser._id,
      name: newUser.username,
      email: newUser.email,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    const userResponse = {
      _id: user._id,
      name: user.username,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= GET USER =================
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      _id: user._id,
      name: user.username,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= GET USER RESUMES =================
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


