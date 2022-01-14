import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InsructorNav";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const fetchInstructor = async () => {
    try {
      const { data } = await axios.post("/api/current-instructor");
      
      if (data.ok) setOk(true);
    } catch (error) {
      console.log(error);
      setOk(false);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchInstructor();  
  }, []);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5 "
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav/>
            </div>
            <div className="col-md-10">
            {children}
            </div>

          </div>

        </div>
        // <>{children}</>
      )}
    </>
  );
};
export default InstructorRoute;
