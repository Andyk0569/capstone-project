import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Shop from "./pages/Shop";
import Cart from './pages/Cart'

// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
