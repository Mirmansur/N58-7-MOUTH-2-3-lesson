import Post from "./componets/Post";
import { PostProvider } from "./context/postContext";
import { AuthProvider } from "./context/useAuth";
import { Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import Auth from "./componets/Auth";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/" element={<Auth />}>
              <Route path="post" element={<Post />} />
            </Route>
          </Routes>
        </PostProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
