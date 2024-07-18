import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import "../componets/Post.css";
import { StyledLogin } from "./StyledPost";
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
      <div className="logos ">
        <div className="logo">
          <div className="logo-img">
            <h1>LOGIN UP</h1>
            <IoMdPerson className="icon-person" />
          </div>
          <form className="login" action="" onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="john32"
              value={name}
              onChange={(e) => setNmae(e.target.value)}
            />
            <input
              type="text"
              placeholder="12345678"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledLogin type="submit">Submit</StyledLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
