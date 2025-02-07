import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const PublicServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <Card
      className="custom-card mb-3 shadow-sm"
      style={{ width: '18rem', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <Card.Img
        className="img-round"
        variant="top"
        src={service.image_url}
        alt={service.name}
        style={{ height: '300px', objectFit: 'cover', objectPosition: 'top' }}
      />
      <Card.Body>
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>
          <p><strong>Category:</strong> {service.category_name}</p>
          <p><strong>Price: &euro;</strong> {service.price}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PublicServiceCard;