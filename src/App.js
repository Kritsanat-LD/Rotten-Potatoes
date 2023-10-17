import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './pages/nav';
import AddMovie from './pages/AddMovie';
import MovieDetail from './pages/MovieDetail';
import UpdateDetails from './pages/UpdateMovie';
import AddMovieGenre from './pages/AddMovieGenre';
import AddActor from './pages/AddActor';
import Comment from './pages/CommentManagement';
import CommentPage from './pages/Commennt';
// import Mycom from './pages/testMultiSelect';
import MovieManagement from './pages/MovieManagement';
import ActorManagement from './pages/ActorManagement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectRoutes';
import HomePage from './pages/homepage';
import Movies from './pages/movies';
function App() {
  return (
    <>
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='Movies' element={<Movies />} />
          <Route path='/' element={< HomePage/>} />
          <Route path='home' element={< Home/>} />
          <Route path='FrontMovieDetail' element={< CommentPage/>} />


          <Route path='addmovie' element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          } />
          <Route path='movieDetails/:id' element={
            <ProtectedRoute>
              <MovieDetail />
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
          <Route path='actorManagement' element={
            <ProtectedRoute>
              <ActorManagement />
            </ProtectedRoute>
          } />
          <Route path='commentpage' element={
            <ProtectedRoute>
              <CommentPage />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </>
  );
}
export default App;