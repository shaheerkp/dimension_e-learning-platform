import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
        <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          <pre>User Dashboard</pre>
        </h1>
      </div>
    
    </UserRoute>
  );
};
export default UserIndex;
