import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './pages/nav';
import AddMovie from './pages/AddMovie';
import UpdateDetails from './pages/UpdateMovie';
import AddMovieGenre from './pages/AddMovieGenre';
import AddActor from './pages/AddActor';
import Comment from './pages/CommentManagement';
// import Mycom from './pages/testMultiSelect';
import MovieManagement from './pages/MovieManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectRoutes';
import HomePage from './pages/homepage';
function App() {
  return (
    <>
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='nav' element={<Navbar />} />
          <Route path='HomePage' element={< HomePage/>} />


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
          <Route path='movieUpdateDetails/:id' element={
            <ProtectedRoute>
              <UpdateDetails />
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
          <Route path='commentManagement' element={
            <ProtectedRoute>
              <Comment />
            </ProtectedRoute>
          } />
          <Route path='movieManagement' element={
            <ProtectedRoute>
              <MovieManagement />
            </ProtectedRoute>
          } />
          {/* <Route path='eiei' element={
            <ProtectedRoute>
              <Mycom />
            </ProtectedRoute>
          } /> */}


      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </>
  );
}

export default App;
