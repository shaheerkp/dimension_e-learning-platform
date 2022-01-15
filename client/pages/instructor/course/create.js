import { Button, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { SaveOutlined } from "@ant-design/icons";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    descrption: "",
    price: "",
    uploading: "",
    paid: true,
    loading: false,
    imagePreview: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.values });
  };

  const handleImage = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
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
          value={values.descrption}
          onChange={handleChanges}
        />
      </div>

      <div className="form-group pt-3">
        <Select
          style={{ width: "100%" }}
          size="large"
          values={values.paid}
          onChange={(v) => setValues({ ...values, paid: !values.paid })}
        >
          <Select.Option value={true}>Paid</Select.Option>
          <Select.Option value={false}>Free</Select.Option>
        </Select>
      </div>

      <div className="form-row pt-3">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {values.loading ? "Uploadng" : "Image Upload"}
              <input
                type="file"
                name="image"
                onchange={handleImage}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
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
