import { Button, Col, Input, Row, Progress,Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
const AddLessonForm = ({
  progress,
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  handleRemoveVideo
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
          onChange={(e) => {
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
            {!uploading&&values.video.Location&&
            <Tooltip title="Remove video">
              <CloseCircleFilled onClick={handleRemoveVideo} className="ms-2 text-danger"/>

            </Tooltip>

            }
          </Col>
          <Col span={24}>
            {progress > 0 && (
              <Progress className="d-flex -center pt-2" percent={progress} steps={10}/>
            )}
          </Col>
          <Col span={24}>
            <Button
              onClick={handleAddLesson}
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
