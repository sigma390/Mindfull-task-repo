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
  





module.exports =  router;