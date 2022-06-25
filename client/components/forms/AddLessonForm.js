import { Button, Col, Input, Row } from "antd";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => {
            setValues({ ...values, title: e.target.value });
          }}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={() => {
            setValues({ ...values, content: e.target.value });
          }}
        />
        <Row>
          <Col span={24}>
            <label className="btn btn-dark btn-block text-left mt-3">
              {uploadButtonText}
              <input
                onChange={handleVideo}
                type="file"
                accept="video/*"
                hidden
              />
            </label>
          </Col>
          <Col span={24}>
            <Button
              onChange={handleVideo}
              className=" mt-3"
              size="large"
              type="primary"
              loading={uploading}  
            >
              Upload lesson
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AddLessonForm;
