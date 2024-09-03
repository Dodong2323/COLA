"use client";
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function ManageUsers({ students = [] }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    tribe: '',
    yearLevel: '',
  });

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setFormValues({
      name: student.name,
      tribe: student.tribe,
      yearLevel: student.yearLevel,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleSaveChanges = () => {
    // Save changes to the local state or handle as needed
    setShowModal(false);
  };

  const handleDeleteStudent = () => {
    // Delete student from the local state or handle as needed
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center">Manage Students</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tribe</th>
            <th>Year Level</th>
            <th>QR Code</th> {/* New column for QR Code */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.tribe}</td>
                <td>{student.yearLevel}</td>
                <td>
                  <QRCodeCanvas
                    value={`Student ID: ${student.studentId}, Name: ${student.name}, Tribe: ${student.tribe}, Year Level: ${student.yearLevel}`}
                    size={64}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(student)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No students available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tribe</Form.Label>
              <Form.Control
                as="select"
                name="tribe"
                value={formValues.tribe}
                onChange={handleChange}
              >
                <option value="">Select Tribe</option>
                <option value="Jungler">Jungler</option>
                <option value="Mage">Mage</option>
                <option value="Fighter">Fighter</option>
                <option value="Support">Support</option>
                <option value="Tank">Tank</option>
                <option value="Assassin">Assassin</option>
                <option value="Marksman">Marksman</option>
                <option value="Magic">Magic</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year Level</Form.Label>
              <Form.Control
                as="select"
                name="yearLevel"
                value={formValues.yearLevel}
                onChange={handleChange}
              >
                <option value="">Select Year Level</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the student?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
    