import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddCategoryForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await axios.post(
        'http://localhost:3001/api/categories',
        { name: categoryName },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      setSuccess(true);
      setCategoryName('');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error adding category:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 custom-card custom-form" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Add New Category</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Category added successfully! Redirecting...</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryName" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100">
            Add Category
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddCategoryForm;
