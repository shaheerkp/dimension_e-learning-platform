import { Avatar, Badge, Button, Col, Input, Row, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { SaveOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";



const CourseCreate = () => {
  const router=useRouter()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    uploading: "",
    paid: true,
    loading: false,
  });

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("");
  const [imageDetails,setImageDetails]=useState({})

  const handleChanges = (e) => {
    console.log(e.target.value, "-", e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = async(e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(e.target.files[0]));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
   
    const formdata=new FormData()
    formdata.append('image',file)
    
    try {
      let { data } = await axios.post("/api/course/upload-image", formdata ,{headers: { "Content-Type": "multipart/form-data" },});
      setImageDetails(data)
      console.log("uploaded data",data);
      setValues ({...values,loading:false})  
    } catch (error) {
      console.log(error);
      setValues ({...values,loading:false})
      // TransformStream("Image upload faild try again")
    }
  

  };
 
  const handleImageRemove=async(e)=>{
   try {
    setValues({...values,loading:true})
     const res=await axios.post("/api/course/remove-image",imageDetails)
     setImageDetails({})
     setPreview("")
     setValues({...values,loading:false})
   } catch (error) {
    console.log(error);
    setValues({...values,loading:false})
    toast("failed")
  
   }


  }

  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post("/api/course",{...values,image:imageDetails})
      toast.success("Course added sucessfully")
      router.push("/instructor") 
       
      
    } catch (error) {
      toast.error(error.response.data)
    }
  }; 

  const courseCreateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChanges}
        />
      </div>
      <div className="form-group pt-3">
        <textarea
          type="text"
          name="description"
          cols="7"
          rows={7}
          className="form-control"
          placeholder="Description"
          value={values.description}
          onChange={handleChanges}
        />
      </div>

      <div className="form-group pt-3">
        <Select
          defaultValue={true}
          style={{ width: "100%" }}
          size="large"
          values={values.paid}
          onChange={(v) => setValues({ ...values, paid: !values.paid })}
        >
          <Select.Option value={true}>Paid</Select.Option>
          <Select.Option value={false}>Free</Select.Option>
        </Select>
      </div>
      {values.paid && (
        <div className="form-group pt-3">
          <input
            placeholder="Price"
            name="price"
            onChange={handleChanges}
            type={"Number"}
            style={{ width: "15rem" }}
          />
        </div>
      )}

      <div className="form-row pt-3">
        <Row>
          <Col span={8}>
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {values.loading ? "Uploadng" : "Image Upload"}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
          </Col>
          <Col span={16}>
            {preview && (
              <div className="col">
                <Badge count="X" onClick={handleImageRemove} className="pointer">
                <Avatar shape="square" size={64} src={preview} />

                </Badge>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <div className="row pt-3">
        <div className="col">
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary"
            icon={<SaveOutlined />}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving....." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <InstructorRoute>
      <>
        <div className="jumbotron bg-primary square text-center">
          <h1 style={{ height: "150px" }} className="p-5  text-light">
            Create course
          </h1>
        </div>
        <div className="p-3">{courseCreateForm()}</div>
      </>
    </InstructorRoute>
  );
};
export default CourseCreate;
