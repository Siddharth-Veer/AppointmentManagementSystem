import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDoctorList from './AdminDoctorList';
import AddDoctor from './AddDoctor';
import ManageDoctors from './ManageDoctors';
import ManageAvailability from './ManageAvailability';
import ManageAppointments from './ManageAppointment'; // Ensure this path is correct

const AdminMainLayout = () => {
  return (
    <div className="d-flex min-vh-100 flex-column">
      {/* Sticky AdminHeader */}
      <AdminHeader className="sticky-top" />

      <div className="d-flex flex-grow-1">
        <AdminSidebar />

        <div className="flex-grow-1">
          <Container fluid className="py-4">
            <Row>
              <Col xs={12} md={12} lg={12}>
                <main className="p-4">
                  <Routes>
                    <Route path="/" element={<AdminDoctorList />} />
                    <Route path="doctorslist" element={<AdminDoctorList />} />
                    <Route path="add-doctor" element={<AddDoctor />} />
                    <Route path="manage-doctors" element={<ManageDoctors />} />
                    <Route path="manage-availability" element={<ManageAvailability />} />
                    <Route path="manage-appointment" element={<ManageAppointments />} />
                  </Routes>
                </main>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
