import { Button } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
          window.location.href=res.data
      })
      .catch((err) => {
        toast.error("Error Completing payout,Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height:"150px" }} className="p-5  text-light">
          Become Instructor
        </h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup payout to publish course </h2>
              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processinig...." : "Setup payout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BecomeInstructor;
