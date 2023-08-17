import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectRoutes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <>
          <AuthContextProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          {/* <Route path='home' element={<Home />} /> */}
          <Route path='home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='addmovie' element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </>
  );
}

export default App;
