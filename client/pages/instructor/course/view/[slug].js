import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Button, Col, Modal, Row, Tooltip, List } from "antd";
import ReactMarkDown from "react-markdown";
import { UploadOutlined,DeleteOutlined,EditOutlined } from "@ant-design/icons";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload video");
  const [progress, setProgress] = useState(0);

  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });  
 
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourses();
  }, [slug]);

  const loadCourses = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      console.log(data);
      setValues({ ...values, title: "", content: "", video: "" });
      setVisible(false);
      setUploadButtonText("Upload video");
      setCourse(data);
      toast("lesson Added");
    } catch (error) {
      console.log(error);
      toast.success("Lesson add failed");
    }
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleRemoveVideo = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      setValues({ ...values, video: {} });
      setProgress(0);
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (error) {
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    }
  };

  const handleVideo = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      const videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            console.log(e);
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

       console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast.error("video upload failed");
    }
  };

  const handleDelete=async(index)=>{
    const answer=window.confirm("Are you sure want to delete")
    if(!answer) return
    let allLessons=values.lessons
    const removed=allLessons.splice(index,1)
    setValues({...values,lessons:allLessons})

    // const {data}=await axios.put(`/api/course/${removed._id}`)

  }

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        <div className="media pt-2">
          <Row>
            <Col>
              <Avatar
                size={100}
                src={course.image ? course.image.Location : "/course.png"}
              />
            </Col>

            <Col>
           
              <div className="row m-3">
                <div className="col-10">
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons && course.lessons.length} lessons
                  </p>
                  <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                    {course.category}
                  </p>
                </div>
                <div className="col-2 float-right">
                     <EditOutlined onClick={()=>{router.push(`/instructor/course/edit/${slug}`)}} className="text-warning" style={{ fontSize: '25px'}} />  
                </div>
              </div>
            </Col>
          </Row>

          <div className="row">
            <div className="col">
              <ReactMarkDown>{course.description}</ReactMarkDown>
            </div>
          </div>
          <div className="row">
            <Button
              onClick={() => {
                setVisible(!visible);
              }}
              className="col-md-6 offset-md-3 text-center"
              type="primary"
              shape="round"
              icon={<UploadOutlined size={10} />}
              size="large"
            >
              Add Lesson
            </Button>
          </div>
          <Modal
            title="+ Add lessons"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <AddLessonForm
              values={values}
              setValues={setValues}
              handleAddLesson={handleAddLesson}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideo={handleVideo}
              progress={progress}
              handleRemoveVideo={handleRemoveVideo}
            />
          </Modal>

          <div className="row pb-5">
            <div className="col lesson-list">
              <h4>
                {course && course.lessons && course.lessons.length}-Lessons
              </h4>

              <List
                itemLayout="horizontal"
                dataSource={course && course.lessons}
                renderItem={(item, index) => (
                  <Item>
                    <Item.Meta
                      avatar={<Avatar>{index + 1}</Avatar>}
                      title={item.title}
                    ></Item.Meta>
                    <DeleteOutlined className="text-danger float-right" onClick={()=>{handleDelete(index,item)}} />
                  </Item>
                )}
              ></List>
            </div>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
