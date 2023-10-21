import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './context/ProtectRoutes';
const LazyLogin = lazy(() => import('./pages/Login'));
const LazySignUp = lazy(() => import('./pages/SignUp'));
const LazySearch = lazy(() => import('./pages/testSearch'));
const LazyMovies = lazy(() => import('./pages/movies'));
const LazyHomePage = lazy(() => import('./pages/homepage'));
const LazyCommentPage = lazy(() => import('./pages/MovieDetails'));
const LazyAddMovie = lazy(() => import('./pages/AddMovie'));
const LazyMovieDetail = lazy(() => import('./pages/MovieDetail'));
const LazyUpdateDetails = lazy(() => import('./pages/UpdateMovie'));
const LazyAddMovieGenre = lazy(() => import('./pages/AddMovieGenre'));
const LazyAddActor = lazy(() => import('./pages/AddActor'));
const LazyComment = lazy(() => import('./pages/CommentManagement'));
const LazyMovieManagement = lazy(() => import('./pages/MovieManagement'));
const LazyActorManagement = lazy(() => import('./pages/ActorManagement'));
const NotFound = lazy(() => import('./pages/notfoundpage'));

function App() {
  return (
      <Router>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="login" element={<LazyLogin />} />
            <Route path="signup" element={<LazySignUp />} />
            <Route path="search" element={<LazySearch />} />
            <Route path="Movies" element={<LazyMovies />} />
            <Route path="/" element={<LazyHomePage />} />
            <Route path="FrontMovieDetail/:id" element={<LazyCommentPage />} />
            <Route path="*" element={<NotFound />} />

            <Route path="addmovie" element={<ProtectedRoute><LazyAddMovie /></ProtectedRoute>} />
            <Route path="movieDetails/:id" element={<ProtectedRoute><LazyMovieDetail /></ProtectedRoute>} />
            <Route path="movieUpdateDetails/:id" element={<ProtectedRoute><LazyUpdateDetails /></ProtectedRoute>} />
            <Route path="addmoviegenre" element={<ProtectedRoute><LazyAddMovieGenre /></ProtectedRoute>} />
            <Route path="addactor" element={<ProtectedRoute><LazyAddActor /></ProtectedRoute>} />
            <Route path="commentManagement" element={<ProtectedRoute><LazyComment /></ProtectedRoute>} />
            <Route path="movieManagement" element={<ProtectedRoute><LazyMovieManagement /></ProtectedRoute>} />
            <Route path="actorManagement" element={<ProtectedRoute><LazyActorManagement /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
