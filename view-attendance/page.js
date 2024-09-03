"use client";
import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function ViewAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, studentId: 'S001', name: 'John Doe', date: '2024-09-01', tribe: 'Mage', yearLevel: '1st Year' },
    { id: 2, studentId: 'S002', name: 'Jane Smith', date: '2024-09-01', tribe: 'Fighter', yearLevel: '2nd Year' },
    { id: 3, studentId: 'S003', name: 'Robert Brown', date: '2024-09-01', tribe: 'Jungler', yearLevel: '1st Year' },
    { id: 4, studentId: 'S004', name: 'Emily Davis', date: '2024-09-01', tribe: 'Support', yearLevel: '3rd Year' },
    { id: 5, studentId: 'S005', name: 'Michael Johnson', date: '2024-09-01', tribe: 'Tank', yearLevel: '2nd Year' },
    { id: 6, studentId: 'S006', name: 'Sophia Martinez', date: '2024-09-01', tribe: 'Assassin', yearLevel: '1st Year' },
    { id: 7, studentId: 'S007', name: 'Daniel Wilson', date: '2024-09-01', tribe: 'Marksman', yearLevel: '3rd Year' },
    { id: 8, studentId: 'S008', name: 'Olivia Anderson', date: '2024-09-01', tribe: 'Magic', yearLevel: '4th Year' },
    { id: 9, studentId: 'S009', name: 'James Thomas', date: '2024-09-01', tribe: 'Jungler', yearLevel: '2nd Year' },
    { id: 10, studentId: 'S010', name: 'Isabella Taylor', date: '2024-09-01', tribe: 'Mage', yearLevel: '3rd Year' },
    { id: 11, studentId: 'S011', name: 'Alexander Lee', date: '2024-09-01', tribe: 'Fighter', yearLevel: '1st Year' },
    { id: 12, studentId: 'S012', name: 'Charlotte White', date: '2024-09-01', tribe: 'Support', yearLevel: '4th Year' },
    { id: 13, studentId: 'S013', name: 'Benjamin Harris', date: '2024-09-01', tribe: 'Tank', yearLevel: '2nd Year' },
    { id: 14, studentId: 'S014', name: 'Ava Clark', date: '2024-09-01', tribe: 'Assassin', yearLevel: '1st Year' },
    { id: 15, studentId: 'S015', name: 'Ethan Lewis', date: '2024-09-01', tribe: 'Marksman', yearLevel: '3rd Year' },
  ]);

  const [filteredYear, setFilteredYear] = useState('');
  const [filteredTribe, setFilteredTribe] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleYearChange = (e) => {
    setFilteredYear(e.target.value);
  };

  const handleTribeChange = (e) => {
    setFilteredTribe(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBack = () => {
    router.push('/'); // Navigate to the main page
  };

  // Filter records
  const filteredRecords = attendanceRecords.filter(record =>
    (filteredYear ? record.yearLevel === filteredYear : true) &&
    (filteredTribe ? record.tribe === filteredTribe : true) &&
    (searchQuery ? record.studentId.includes(searchQuery) || record.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <div className="container my-5">
      <Button variant="secondary" className="position-fixed top-0 end-0 m-3" onClick={handleBack}>
        Back
      </Button>

      <h1 className="text-center mb-4">Attendance Records</h1>

      <div className="d-flex justify-content-between mb-4">
        <Form.Group controlId="searchInput" className="mb-3 d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by Student ID or Name"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '300px' }}
          />
          <Button variant="primary" className="ms-2">Search</Button>
        </Form.Group>
      </div>

      <Form className="mb-4">
        <Form.Group controlId="yearFilter" className="mb-3">
          <Form.Label>Filter by Year Level</Form.Label>
          <Form.Control
            as="select"
            value={filteredYear}
            onChange={handleYearChange}
          >
            <option value="">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="tribeFilter" className="mb-3">
          <Form.Label>Filter by Tribe</Form.Label>
          <Form.Control
            as="select"
            value={filteredTribe}
            onChange={handleTribeChange}
          >
            <option value="">All Tribes</option>
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
      </Form>

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Tribe</th>
              <th>Year Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.studentId}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.tribe}</td>
                <td>{record.yearLevel}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <style jsx>{`
        .table-container {
          max-height: 500px; /* Adjust based on your needs */
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
