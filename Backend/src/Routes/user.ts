import mongoose from 'mongoose'
import express, { Router } from 'express';
import  { type Request,type Response } from 'express';
const app = express();
const router: Router = express.Router();
import UserModel from "../Database/db"
import { Authentication } from '../Middlewares/auth';
import jwt from 'jsonwebtoken';
export const SECRET = "omkar23"



 //user Signup route
 router.post("/signup", async (req: Request, res: Response) => {
    
      const user = req.body;
  
      // Check if the user with the given email already exists
      const existingUser = await UserModel.findOne({ email: user.email });
  
      if (existingUser) {
        // User already exists
        return res.status(403).json({ msg: "User already exists" });
      }
  
      // User does not exist, create a new user
      const newUser = new UserModel(user);
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign({ email: user.email, role: 'user' }, SECRET, { expiresIn: '1hr' });
  
      // Send the response with success message and token
      res.json({ msg: "User created successfully", token });
    } 
  );



  //login route
  router.post('/login', async (req: Request, res: Response) => {
    
      const { email, password } = req.body;
  
      // Check if the user with the given email and password exists
      const user = await UserModel.findOne({ email, password });
  
      if (user) {
        // User found, generate a JWT token
        const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
      } else {
        // Invalid email or password
        res.status(403).json({ message: 'Invalid email or password' });
      }
    }
  );


  //get all list of users

  router.get('/users', Authentication, async (req:Request, res:Response) => {
    const users = await UserModel.find();
    res.json({ users });
  });

  // Route for fetching users with filtering options
router.get('/users/dashboard', async (req: Request, res: Response) => {
    
      let sortOption: any;
  
      // Check the query parameter for sorting
      const { sort } = req.query;
  
      switch (sort) {
        case 'A-Z':
          sortOption = { name: 1 };
          break;
        case 'Z-A':
          sortOption = { name: -1 };
          break;
        case 'LastModified':
          sortOption = { lastModified: -1 };
          break;
        case 'LastInserted':
          sortOption = { createdAt: -1 };
          break;
        default:
          sortOption = {};
      }
  
      // Fetch users from the database with the specified sorting criteria
      const users = await UserModel.find().sort(sortOption);
  
      // Send the sorted list of users in the response
      res.json({ users });
    } 
  );

  // Route for searching users
  router.get('/users/search', async (req: Request, res: Response) => {
    
    const { name, phone, email } = req.query;
    //type assertion
     const queryName = name as string ;
     const queryPhone = phone as string;
     const queryEmail = email as string ;

    // Build a filter object based on the provided parameters
    const filter: any = {};

    if (name) {
      filter.name = { $regex: new RegExp(queryName, 'i') };
    }

    if (phone) {
      filter.phone = { $regex: new RegExp(queryPhone, 'i') };
    }

    if (email) {
      filter.email = { $regex: new RegExp(queryEmail, 'i') };
    }

    // Search users based on the constructed filter
    const users = await UserModel.find(filter);

    // Send the list of matching users in the response
    res.json({ users });
    
  });
  // Middleware to ensure authentication
router.use(Authentication);



// ==============> Route for updating user details <=============
router.put('/users/:userId', async (req: Request, res: Response) => {
    // Extract user ID from the request parameters
    const userId = req.params.userId;

    // Check if the user ID is valid (you may want to add additional validation)
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Extract updated details from the request body
    const { name, email, phone, gender, chbk1, city, state } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.chbk1 = chbk1 || user.chbk1;
    user.city = city || user.city;
    user.state = state || user.state;

    // Save the updated user
    await user.save();

    // Send the updated user in the response
    res.json({ user });
  
});



//by Id

router.get('/users/:userId',Authentication, async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.userId;

    // Check if the user ID is valid (you may want to add additional validation)
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user information in the response
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



  

router.put('/users/:userId', async (req: Request, res: Response) => {
  // Extract user ID from the request parameters
  const userId = req.params.userId;

  // Check if the user ID is valid (you may want to add additional validation)
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  // Extract updated details from the request body
  const { name, email, phone, gender, chbk1, city, state } = req.body;

  // Find the user by ID
  const user = await UserModel.findById(userId);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user details
  user.name = name || user.name;
  user.email = email || user.email;
  user.password = user.password;
  user.phone = phone || user.phone;
  user.gender = gender || user.gender;
  user.chbk1 = chbk1 || user.chbk1;
  user.city = city || user.city;
  user.state = state || user.state;

  // Save the updated user
  await user.save();

  // Send the updated user in the response
  res.json({ user });

});



module.exports =  router;