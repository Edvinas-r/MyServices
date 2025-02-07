import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddServiceForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    category_name: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3001/api/services", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSuccess(true);
      navigate("/admin");
    } catch (err) {
      console.error("Error adding service:", err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 custom-card custom-form" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Add New Service</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Service added successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Service Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="image_url" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="category_name" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" name="category_name" value={formData.category_name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} required />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100">
            Add Service
          </Button>
        </Form>
      </Card>
    </Container>
  );
};


export default AddServiceForm;
