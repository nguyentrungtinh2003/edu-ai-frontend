import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userId, setUserId] = useState("67e8b3e32a53d40c72d3b7cc"); // Mặc định userId

  // Xử lý chọn file
  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  // Xử lý upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Vui lòng chọn ít nhất một file!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Upload thành công!");
      setSelectedFiles([]); // Reset danh sách file sau khi upload
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("Upload thất bại!");
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={3}>
          <h2>Side Bar</h2>
        </Col>
        <Col md={9}>
          <h3>Upload Files</h3>
          <Form>
            <Form.Group controlId="fileUpload">
              <Form.Label>Chọn file:</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>

            {/* Hiển thị danh sách file đã chọn */}
            {selectedFiles.length > 0 && (
              <div className="mt-3">
                <h5>Danh sách file:</h5>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
