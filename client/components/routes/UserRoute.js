import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {SyncOutlined} from "@ant-design/icons"

const UserRoute = ({children}) => {
  const [ok, setOk] = useState(false);
  const router=useRouter()
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data)
      alert(data)
      if(data.ok) setOk(true)
    } catch (error) {
      alert("catch")
      console.log(error);
      setOk(false)
      router.push("/login")
    }
  };

 

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!ok ? <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5 "/>: <>{children}</>}
    </>
  );
};
export default UserRoute;