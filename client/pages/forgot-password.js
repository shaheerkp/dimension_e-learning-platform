import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { Form, Input } from "antd";
import validator from "@brocode/simple-react-form-validation-helper";
import FormItem from "antd/lib/form/FormItem";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);
  console.log("forget paass", user);

  useEffect(() => {
    if (!user == null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      console.log("try");
      setSuccess(true);
      setLoading(false);
      toast("Check Email form secrete code");
    } catch (error) {
      console.log("catch", error);
      setLoading(false);
      toast("User not Found");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault;
    try {
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setCode("");
      setEmail("");
      setNewPassword("");
      setLoading(false);
      toast("Password changed Successfulll")
      router.push("/login")
    } catch (error) {
      setLoading(false);
      toast("error");
    }
  };

  return (
    <>
      <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          Fogot Password
        </h1>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <Form onSubmitCapture={!success ? handleSubmit : handleResetPassword}>
          {" "}
          <Form.Item>
            {" "}
            <span className="text-center text-danger errspan ">
              {emailErr}{" "}
            </span>
            {!success && (
              <Input
                type="email"
                className="form-control p-3"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            )}
          </Form.Item>
          {success && (
            <>
              {" "}
              <FormItem>
                <Input
                  type="text"
                  className="form-control p-3"
                  value={code}
                  placeholder="Enter Secrete code"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />

                <Input
                  type="password"
                  className="form-control p-3"
                  value={newPassword}
                  placeholder="Enter New password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </FormItem>
            </>
          )}
          <button
            className="text-center mt-3"
            type="submit"
            style={{ width: "100%", backgroundColor: "#303030" }}
            className="btn btn-lg btn-block text-light"
            disabled={!email}
          >
            {loading ? (
              <SyncOutlined spin />
            ) : success ? (
              "Change password"
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
