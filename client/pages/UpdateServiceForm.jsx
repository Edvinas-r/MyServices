import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const UpdateServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    image_url: '',
    price: '',
    category_name: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (user?.role_id !== 1) {
      alert('You are not authorized to access this page.');
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const serviceResponse = await axios.get(`http://localhost:3001/api/services/${id}`);
        const categoriesResponse = await axios.get('http://localhost:3001/api/categories');

        setCategories(categoriesResponse.data.data);
        setServiceData({
          ...serviceResponse.data.data,
          category_id: serviceResponse.data.data.category_name,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/services/${id}`, serviceData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert('Service updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 custom-card custom-form" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">Update Service</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control type="text" name="name" value={serviceData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group controlId="image_url" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image_url" value={serviceData.image_url} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={serviceData.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="category_name" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category_name"
              value={serviceData.category_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UpdateServiceForm;
