import { Avatar, Badge, Button, Col, Input, Row, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  values,
  handleChanges,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove,
  editpage = false,
}) => {
  return (
    <>
      {values && (
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
                    <Badge
                      count="X"
                      onClick={handleImageRemove}
                      className="pointer"
                    >
                      <Avatar shape="square" size={64} src={preview} />
                    </Badge>
                  </div>
                )}
                {editpage && values.image && (
                  <Avatar
                    shape="square"
                    size={64}
                    src={values.image.Location}
                  />
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
      )}
    </>
  );
};

export default CourseCreateForm;
