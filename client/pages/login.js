import { useState } from "react";
import { SmileOutlined, SyncOutlined } from "@ant-design/icons";
// import validator from "../valdator/validator";
import axios from "axios";
import { toast } from "react-toastify";

import { Form, Input } from "antd";
import validator from "@brocode/simple-react-form-validation-helper";
import Link from "next/link"

const Login = () => {
 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

 
  const [emailErr, setEmailErr] = useState(" ");
  const [passErr, setPassErr] = useState(" ");

  const [active,isActive]=useState(false) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
       
        emailStatus == "success" &&
        passwordStatus == "success"
      ) {
        const { data } = await axios.post(`/api/signin`, {
          email,
          password,
        });
        console.log("login response",data);
      
        setLoading(false);
      } else {
    
        setLoading(false);
      }
    } catch (error) {
  
      setLoading(false);
    }
  };

  return (
    <>
      <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          Signin
        </h1>
      </div>

      <div className="container col-md-4 offset-md-4 pb-5">
        <Form onSubmitCapture={handleSubmit}>
    
          <Form.Item hasFeedback validateStatus={emailStatus}>
            <span className="text-center text-danger errspan ">
              {emailErr}{" "}
            </span>
            <Input
              type="email"
              className="form-control p-3"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                emailErr == ""
                  ? setEmailStatus("success")
                  : setEmailStatus("error");
                setEmail(e.target.value);
                validator.emailInputChangeHandler(e.target.value, setEmailErr);
                validator.emailInputBlurHandler(e.target.value, setEmailErr);
              }}
              onBlur={(e) => {
                emailErr == ""
                  ? setEmailStatus("success")
                  : setEmailStatus("error");
              }}
            />
          </Form.Item>

          <Form.Item hasFeedback validateStatus={passwordStatus}>
            <span className="text-center text-danger errspan ">{passErr} </span>
            <Input
              type="password"
              className="form-control p-3"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
                validator.passwordInputChangeHandler(
                  e.target.value,
                  setPassErr
                );
                validator.passwordInputBlurHandler(e.target.value, setPassErr);
                passErr == ""
                  ? setPasswordStatus("success")
                  : setPasswordStatus("error");
              }}
              onBlur={(e) => {
                passErr == ""
                  ? setPasswordStatus("success")
                  : setPasswordStatus("error");
              }}
            />
          </Form.Item>

          <button
            type="submit"
            style={{ width: "100%", backgroundColor: "#303030" }}
            className="btn btn-lg btn-block text-light"
            disabled={ !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </Form>
        <p className="text-center p-3">
          Create Account  ? 
          <Link href="/register">
          Signup
          </Link>
         

        </p>
      </div>
    </>
  );
};

export default Login;
