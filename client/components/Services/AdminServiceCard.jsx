import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';

const AdminServiceCard = ({ service, onDelete }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    navigate(`/service/${service.id}`, { state: { canBook: true } });
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    navigate(`/user/update-service/${service.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
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
            <p>
              <strong>Category:</strong> {service.category_name}
            </p>
            <p>
              <strong>Price: &euro;</strong> {service.price}
            </p>
          </Card.Text>
          <Button variant="dark" className="me-2" onClick={handleUpdateClick}>
            Update
          </Button>
          <Button variant="dark" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      <DeleteConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => {
          onDelete(service.id);
          setShowModal(false);
        }}
        itemTitle={service.name}
      />
    </>
  );
};

export default AdminServiceCard;
