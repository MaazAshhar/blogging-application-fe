import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/public/Login'
import SignUp from './pages/public/SignUp'
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Feed from './pages/private/Feed';
import ProfileInfo from './pages/private/ProfileInfo';
import CreatePost from './pages/private/CreatePost';
import { getAllPost, getPostByUser } from './services/post_service';

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="feed" element={<Feed getPost={getAllPost} />} />
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="my-post" element={<Feed getPost={getPostByUser} wantDeleteButton={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
