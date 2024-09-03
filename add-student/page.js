'use client';
import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from 'next/navigation';

export default function AddStudent() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [tribe, setTribe] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [qrData, setQrData] = useState('');
  const [students, setStudents] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId || !name || !tribe || !yearLevel) { // Updated to use tribe and yearLevel
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Add new student to local state
    setStudents([
      ...students,
      { studentId, name, tribe, yearLevel } // Include tribe and yearLevel
    ]);

    // Generate QR code data
    setQrData(`Student ID: ${studentId}, Name: ${name}, Tribe: ${tribe}, Year Level: ${yearLevel}`); // Include tribe and yearLevel
    setShowModal(true);

    // Clear form fields
    setStudentId('');
    setName('');
    setTribe('');
    setYearLevel('');
    setErrorMessage(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/view-attendance');
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Container className="my-5">
      <Card className="custom-card shadow p-4 mb-4 rounded">
        <Card.Body>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Card.Title as="h4" className="text-center text-gradient">Add Student</Card.Title>
            <Button
              variant="secondary"
              onClick={handleBackClick}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: '10px'
              }}
            >
              Back
            </Button>
          </div>
          {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStudentId" className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="custom-input"
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="custom-input"
              />
            </Form.Group>

            <Form.Group controlId="formTribe" className="mb-3">
              <Form.Label>Tribe</Form.Label>
              <Form.Control
                as="select"
                value={tribe}
                onChange={(e) => setTribe(e.target.value)}
                className="custom-select"
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

            <Form.Group controlId="formYearLevel" className="mb-4">
              <Form.Label>Year Level</Form.Label>
              <Form.Control
                as="select"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                className="custom-select"
              >
                <option value="">Select Year Level</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 custom-button">
              Add Student
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Student Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The student has been added successfully!</p>
          <p>QR Code for the student:</p>
          <QRCodeCanvas value={qrData} size={256} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
