
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
// import Navbar from './pages/nav';
import AddMovie from './pages/AddMovie';
import AddMovieGenre from './pages/AddMoivieGenre';
import AddActor from './pages/AddActor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectRoutes';

function App() {
  return (
    <>
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          {/* <Route path='nav' element={<Navbar />} /> */}


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
          <Route path='addmoviegenre' element={
            <ProtectedRoute>
              <AddMovieGenre />
            </ProtectedRoute>
          } />
          <Route path='addactor' element={
            <ProtectedRoute>
              <AddActor />
            </ProtectedRoute>
          } />

      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </>
  );
}

export default App;
