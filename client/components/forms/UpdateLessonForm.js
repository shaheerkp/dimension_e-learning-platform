import { Button, Col, Input, Row, Progress, Switch } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import ReactPlayer from "react-player"
const UpdateLessonForm = ({
  current,
  setCurrent,
  handleVideo,
  handleUpdateLesson,
  uploadButtonTex,
  uploadVideoButtonText,
  uploading,
  progress,
}) => {

    console.log(current);
  return (
    <div className="container pt-3">
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => {
            setCurrent({ ...current, title: e.target.value });
          }}
          value={current.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => {
            setCurrent({ ...current, content: e.target.value });
          }}
          value={current.content}
        />
        <Row>
          <Col span={24}>
            <label className="btn btn-dark btn-block text-left mt-3">
              {uploadVideoButtonText}
              <input
                onChange={handleVideo}
                type="file"
                accept="video/*"
                hidden
              />
            </label>
            {!uploading &&current.video&& current.video.Location && (
              <div className="pt-2 d-flex justify-content-center">
               <ReactPlayer url={current.video.Location} width="410px" height="240px" controls />
              </div>
            )}
          </Col>
          <Col span={24}>
            {progress > 0 && (
              <Progress
                className="d-flex -center pt-2"
                percent={progress}
                steps={10}
              />
            )}

            <div className="d-flex justify-content-between pt-2">
              <span className="pt-3 badge text-primary">preview</span>
              <Switch className="float-right mt-2" disabled={uploading} defaultChecked={current.free_preview} name="free_preview" onChange={(v)=>setCurrent({...current,free_preview:v})}/>
            </div>
          </Col>
          <Col span={24}>
            <Button
              onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
