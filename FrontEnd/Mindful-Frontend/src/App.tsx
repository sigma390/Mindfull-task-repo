import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './Components/Signup';
import Register from './Components/Register';
import Users from './Components/Users';
import UserDetails from './Components/UserDetails';
import  Landing  from './Components/Landing';
import SearchAppBar from './Components/SearchAppBar';
function App() {


  return (
    <Router>
      <SearchAppBar/>
        <Routes>
          <Route path={"/signin"} element={<Signup />} />
          <Route path={"/users"} element={<Users />} />
          <Route path={"/users/:userId"} element={<UserDetails/>}/>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/signup"} element={<Register />} />
        </Routes>
    </Router>
  )
}

export default App
