"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const db_1 = __importDefault(require("../Database/db"));
const auth_1 = require("../Middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "omkar23";
//user Signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // Check if the user with the given email already exists
    const existingUser = yield db_1.default.findOne({ email: user.email });
    if (existingUser) {
        // User already exists
        return res.status(403).json({ msg: "User already exists" });
    }
    // User does not exist, create a new user
    const newUser = new db_1.default(user);
    yield newUser.save();
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ email: user.email, role: 'user' }, exports.SECRET, { expiresIn: '1hr' });
    // Send the response with success message and token
    res.json({ msg: "User created successfully", token });
}));
//login route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if the user with the given email and password exists
    const user = yield db_1.default.findOne({ email, password });
    if (user) {
        // User found, generate a JWT token
        const token = jsonwebtoken_1.default.sign({ email, role: 'user' }, exports.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        // Invalid email or password
        res.status(403).json({ message: 'Invalid email or password' });
    }
}));
//get all list of users
router.get('/users', auth_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.find();
    res.json({ users });
}));
// Route for fetching users with filtering options
router.get('/users/dashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sortOption;
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
    const users = yield db_1.default.find().sort(sortOption);
    // Send the sorted list of users in the response
    res.json({ users });
}));
// Route for searching users
router.get('/users/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email } = req.query;
    //type assertion
    const queryName = name;
    const queryPhone = phone;
    const queryEmail = email;
    // Build a filter object based on the provided parameters
    const filter = {};
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
    const users = yield db_1.default.find(filter);
    // Send the list of matching users in the response
    res.json({ users });
}));
// Middleware to ensure authentication
router.use(auth_1.Authentication);
// ==============> Route for updating user details <=============
router.put('/users/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user ID from the request parameters
    const userId = req.params.userId;
    // Check if the user ID is valid (you may want to add additional validation)
    if (!userId) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    // Extract updated details from the request body
    const { name, email, phone, gender, chbk1, city, state } = req.body;
    // Find the user by ID
    const user = yield db_1.default.findById(userId);
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
    yield user.save();
    // Send the updated user in the response
    res.json({ user });
}));
//by Id
router.get('/users/:userId', auth_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user ID from the request parameters
        const userId = req.params.userId;
        // Check if the user ID is valid (you may want to add additional validation)
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Find the user by ID
        const user = yield db_1.default.findById(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Send the user information in the response
        res.json({ user });
    }
    catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.put('/users/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user ID from the request parameters
    const userId = req.params.userId;
    // Check if the user ID is valid (you may want to add additional validation)
    if (!userId) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    // Extract updated details from the request body
    const { name, email, phone, gender, chbk1, city, state } = req.body;
    // Find the user by ID
    const user = yield db_1.default.findById(userId);
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
    yield user.save();
    // Send the updated user in the response
    res.json({ user });
}));
//delete user 
router.delete('/users/:userId', auth_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user ID from the request parameters
        const userId = req.params.userId;
        // Check if the user ID is valid (you may want to add additional validation)
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Find the user by ID
        const user = yield db_1.default.findById(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete the user
        yield db_1.default.findByIdAndDelete(userId);
        // Send a success message in the response
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
module.exports = router;
