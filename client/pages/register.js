import { useState } from "react";
import { SmileOutlined, SyncOutlined } from "@ant-design/icons";
// import validator from "../valdator/validator";
import axios from "axios";
import { toast } from "react-toastify";

import { Form, Input } from "antd";
import validator from "@brocode/simple-react-form-validation-helper";
import Link from "next/link"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [nameStatus, setNameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  const [nameErr, setNameErr] = useState(" ");
  const [emailErr, setEmailErr] = useState(" ");
  const [passErr, setPassErr] = useState(" ");

  const [active,isActive]=useState(false) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        nameStatus == "success" &&
        emailStatus == "success" &&
        passwordStatus == "success"
      ) {
        const { data } = await axios.post(`/api/register`, {
          name,
          email,
          password,
        });
        console.log("data",data);
        toast.success("User Registered succesfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "",
        });
        setLoading(false);
      } else {
        toast.warn("Please fill details correctly", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "",
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("User Already exist  ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          Register
        </h1>
      </div>

      <div className="container col-md-4 offset-md-4 pb-5">
        <Form onSubmitCapture={handleSubmit}>
          <Form.Item hasFeedback validateStatus={nameStatus}>
            <span className="text-center text-danger errspan ">{nameErr}</span>
            <Input
              type="text"
              className="form-control p-3"
              value={name}
              placeholder="Enter Full Name"
              onChange={(e) => {
                nameErr == ""
                  ? setNameStatus("success")
                  : setNameStatus("error");
                setName(e.target.value);
                validator.nameInputChangeHandler(e.target.value, setNameErr);
              }}
              onBlur={(e) => {
                nameErr == ""
                  ? setNameStatus("success")
                  : setNameStatus("error");
                validator.nameInputBlurHandler(e.target.value, setNameErr);
              }}
            />
          </Form.Item>

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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Register"}
          </button>
        </Form>
        <p className="text-center p-3">
          Already Registered  ? 
          <Link href="/login">
          Signin
          </Link>
         

        </p>
      </div>
    </>
  );
};

export default Register;
