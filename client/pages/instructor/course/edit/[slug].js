import axios from "axios";
import { useState, useEffect } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import { List, Avatar, Modal } from "antd";
import Item from "antd/lib/list/Item";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

const CourseEdit = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    uploading: "",
    paid: true,
    loading: false,
    lessons: [],
  });
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("");
  const [imageDetails, setImageDetails] = useState({});

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
    if (data && data.image) {
      setImageDetails(data.image);
    }
  };

  const handleChanges = (e) => {
    console.log(e.target.value, "-", e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(e.target.files[0]));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    const formdata = new FormData();
    formdata.append("image", file);

    try {
      let { data } = await axios.post("/api/course/upload-image", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageDetails(data);
      console.log("uploaded data", data);
      setValues({ ...values, loading: false });
    } catch (error) {
      console.log(error);
      setValues({ ...values, loading: false });
      // TransformStream("Image upload faild try again")
    }
  };

  const handleImageRemove = async (e) => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", imageDetails);
      setImageDetails({});
      setPreview("");
      setValues({ ...values, loading: false });
    } catch (error) {
      console.log(error);
      setValues({ ...values, loading: false });
      toast("failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image: imageDetails,
      });
      toast.success("Course updated sucessfully");
      //   router.push("/instructor");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1);
    allLessons.splice(targetItemIndex, 0, movingItem);

    setValues({ ...values, lessons: [...allLessons] });
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image: imageDetails,
    });
    toast.success("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure want to delete");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons });

    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
  };

  const handleVideo = async (e) => {
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${values.instructor._id}`,
        current.video
      );
      console.log("remove", res);
    }
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);

    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);

    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );

    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video")
    setVisible(false)
    
    if(data.ok){
      let arr=values.lessons
      const index=arr.findIndex((el)=>el._id===current._id);
      arr[index]=current
      setValues({...values,lessons:arr})
    }
    
    toast("Lesson updated")
    
  }; 

  return (
    <InstructorRoute>
      <>
        <div className="jumbotron bg-primary square text-center">
          <h1 style={{ height: "150px" }} className="p-5  text-light">
            Update course
          </h1>
        </div>
        <div className="p-3">
          <CourseCreateForm
            handleImage={handleImage}
            handleSubmit={handleSubmit}
            values={values}
            handleChanges={handleChanges}
            setValues={setValues}
            preview={preview}
            uploadButtonText={uploadButtonText}
            handleImageRemove={handleImageRemove}
            editpage={true}
          />
        </div>
        <hr />
        <div className="ms-3 pb-5">
          <div className="lesson-list">
            <h4>{values && values.lessons && values.lessons.length}-Lessons</h4>

            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={values && values.lessons}
              renderItem={(item, index) => (
                <Item
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Item.Meta
                    onClick={() => {
                      setVisible(true);
                      setCurrent(item);
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>
                  <DeleteOutlined
                    className="text-danger float-right me-5"
                    onClick={() => {
                      handleDelete(index, item);
                    }}
                  />
                </Item>
              )}
            ></List>
          </div>
        </div>
      </>
      <Modal
        title="Update Lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadButtonText={uploadButtonText}
          uploadVideoButtonText={uploadVideoButtonText}
          uploading={uploading}
          progress={progress}
        ></UpdateLessonForm>
      </Modal>
    </InstructorRoute>
  );
};
export default CourseEdit;
