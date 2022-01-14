import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate=()=>{
    return (
      <InstructorRoute>
        <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          Create course
        </h1>
      </div>
      </InstructorRoute>
    )

}
export default CourseCreate;