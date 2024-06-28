import React, { useState } from "react";
import "./Resource.css";
import { Button, Modal, Form } from "react-bootstrap";

const resources = [
  {
    id: 1,
    user: "Alice",
    content: "Check out this article on AI: https://example.com/article",
    date: "2023-06-28",
  },
  {
    id: 2,
    user: "Bob",
    content:
      "Hey! I'm attaching unit-1 link: https://youtube.com/quehU897&t=23s",
    date: "2023-06-29",
  },
  {
    id: 3,
    user: "Charlie",
    content: "Here's a useful PDF file: https://example.com/file.pdf",
    date: "2023-06-30",
  },
  {
    id: 4,
    user: "David",
    content: "Checkout this coding tutorial: https://example.com/tutorial",
    date: "2023-07-01",
  },
  {
    id: 5,
    user: "Eve",
    content: "Sharing a webinar recording: https://example.com/webinar",
    date: "2023-07-02",
  },
  {
    id: 6,
    user: "Frank",
    content: "Link to a useful GitHub repository: https://github.com/example",
    date: "2023-07-03",
  },
  {
    id: 7,
    user: "Grace",
    content: "Check out this online course: https://example.com/course",
    date: "2023-07-04",
  },
  {
    id: 8,
    user: "Hannah",
    content: "Here's a podcast episode: https://example.com/podcast",
    date: "2023-07-05",
  },
  {
    id: 9,
    user: "Isaac",
    content: "Sharing a research paper: https://example.com/research",
    date: "2023-07-06",
  },
  {
    id: 10,
    user: "Jack",
    content:
      "Interesting article on deep learning: https://example.com/deeplearning",
    date: "2023-07-07",
  },
];

function Resource() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // Reset form fields and close modal as needed
    setShowModal(false);
  };

  return (
    <div>
      {resources.map((resource) => (
        <div key={resource.id} className="resource-div">
          <div className="resource-content">
            <p className="resource-user">Posted by: {resource.user}</p>
            <p>{resource.content}</p>
          </div>
          <div className="resource-date">
            <small>{resource.date}</small>
          </div>
        </div>
      ))}

      {/* Button to trigger modal */}
      <div className="add-button-container">
        <button className="add-button" onClick={handleModalShow}>
          +
        </button>
      </div>

      {/* Modal for adding new resource */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" placeholder="Enter link" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Resource;
