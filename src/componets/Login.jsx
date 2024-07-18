import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../componets/Post.css";
const Login = () => {
  const [name, setNmae] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name === "john32" && email === "12345678") {
      localStorage.setItem("email", email);
      navigate("/post");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="container">
      <form className="" action="" onSubmit={handelSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setNmae(e.target.value)}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
