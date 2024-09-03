'use client';
import Link from 'next/link';
import { Container, Row, Col, Card } from 'react-bootstrap';
export default function Dashboard() {
  return (
    <Container className="my-5">
      <h1 className="text-center">Attendance Monitoring App</h1>
      <h3 className="text-center mb-4">Dashboard</h3>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Link href="/add-student" passHref>
            <Card className="shadow-sm text-center cursor-pointer custom-card">
              <Card.Body>
                <Card.Title className="text-primary">
                  <i className="bi bi-plus-circle"></i> Add Student
                </Card.Title>
                <Card.Text>
                  Add a new student to the attendance monitoring system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4} className="mb-4">
        <Link href="/view-attendance" passHref>
  <Card className="shadow-sm text-center cursor-pointer custom-card">
    <Card.Body>
      <Card.Title className="text-success">
        <i className="bi bi-list-check"></i> View Attendance
      </Card.Title>
      <Card.Text>
        Browse and review attendance records.
      </Card.Text>
    </Card.Body>
  </Card>
</Link>

        </Col>
        <Col md={4} className="mb-4">
          <Link href="/manage-users" passHref>
            <Card className="shadow-sm text-center cursor-pointer custom-card">
              <Card.Body>
                <Card.Title className="text-warning">
                  <i className="bi bi-person-lines-fill"></i> Manage Users
                </Card.Title>
                <Card.Text>
                  Edit, delete, and manage user information.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>

  );
}
