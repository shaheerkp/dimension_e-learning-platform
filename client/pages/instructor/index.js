import { Avatar, Col, Row } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import course from "../../../server/models/course";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { CheckCircleFilled,CloseCircleFilled } from "@ant-design/icons";

const CourseCreate = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await axios.get("/api/instructor-courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InstructorRoute>
      <div className="jumbotron bg-primary square text-center">
        <h1 style={{ height: "150px" }} className="p-5  text-light">
          instructor
        </h1>
      </div>
      {courses &&
        courses.map((course, index) => {
          return (
            <>
              <Row>
                <Col span={4}>
                  <div className="col ps-5 pt-2">
                    <Avatar
                      size={150}
                      src={course.image ? course.image.Location : "/course.png"}
                    />
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    <div className=" ps-3 pt-5">
                      <Link
                        href={`/instructor/course/view/${course._id}`}
                        className="pointer"
                      >
                        <a className="h5 mt-2 text-primary">{course.name}</a>
                      </Link>
                    </div>
                  </Row>
                  <Row>
                    <div className=" ps-3">
                      <a className="h6  text-success">
                        {`[${course.lessons.length}] lessons`}
                      </a>
                    </div>
                  </Row>
                  <Row>
                    <div className=" ps-3">
                      {course.lessons.length < 5 ? (
                        <a className="h6  text-danger">
                          Min 5 lessons required to publish lesson
                        </a>
                      ) : (
                        <a className="h6  text-success">Ready for publishing</a>
                      )}
                    </div>
                  </Row>
                </Col>
                <Col span={1}>
                  {course.published ? (
                    <div className=" ps-3 pt-4">
                      <CheckCircleFilled className="h2 text-success" />
                    </div>
                  ) : (
                    <div className=" ps-3 pt-4">
                      <CloseCircleFilled className="h2 text-danger" />
                    </div>
                  )}
                </Col>
              </Row>
            </>
          );
        })}
      {/* <pre>{JSON.stringify(courses)}</pre> */}
    </InstructorRoute>
  );
};
export default CourseCreate;
