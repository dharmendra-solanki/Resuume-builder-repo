// import jwt from "jsonwebtoken";

// const protect = async (req,res,next)=>{
//     const token = req.herders.authorization;
//     if(!token){
//         return res.status(401).json({ message: "Unauthorized, no token provided"});
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;    
//         next();
//     }
//     catch (error) {
//         return res.status(401).json({ message: "Unauthorized, invalid token"});
//     }
// }

// export default protect;


import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    // ✅ header check
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const authHeader = req.headers.authorization;

    // ✅ Bearer format check
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAME key jo token me use ki thi
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export default protect;
