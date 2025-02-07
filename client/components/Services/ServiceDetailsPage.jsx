import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './ServiceDetailsPage.css';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/services/${id}`);
        setService(response.data.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <Container className="service-details-container d-flex justify-content-center align-items-center vh-100">
      <Card
        className="service-details-card shadow-lg p-4 custom-card custom-form"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <h3 className="text-center mb-4">{service.name}</h3>
        <Card.Img
          variant="top"
          src={service.image_url}
          alt={service.name}
          className="service-details-image img-fluid rounded"
        />
        <Card.Body>
          <p>{service.description}</p>
          <p>
            <strong>Category:</strong> {service.category_name}
          </p>
          <p>
            <strong>Price: &euro;</strong> {service.price}
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServiceDetailsPage;

