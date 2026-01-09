import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, pass } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  //Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id,res);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token
    },
  });
};

const login = async (req, res) => {
  const { email, pass } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: "User doesnt exist, please register to login!!" });
  }

  //valid password

  const validPass = await bcrypt.compare(pass, user.password);

  if (!validPass) {
    return res.status(401).json({
      error: "Inalid Password or Email",
    });
  }

  const token = generateToken(user.id,res)

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token
    },
  });
};

const logout = async (req,res)=>{
  res.cookie("jwt","",{
    httpOnly:true, 
    expires:new Date(0)
  })
  res.status(200).json({
    status:"success",
    message:"Logged Out Successfully"
  })
}

export { register, login , logout};
