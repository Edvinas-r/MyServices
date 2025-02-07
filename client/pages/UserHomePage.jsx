import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filters';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';
import AdminServiceCard from '../components/Services/AdminServiceCard';

const UserHomePage = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesResponse = await axios.get('http://localhost:3001/api/services');
        const categoriesResponse = await axios.get('http://localhost:3001/api/categories');

        setServices(servicesResponse.data.data);
        setFilteredServices(servicesResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error fetching services or categories:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    if (searchQuery) {
      filtered = filtered.filter((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) => service.category_id === Number(selectedCategory));
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, services]);

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3001/api/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setFilteredServices(filteredServices.filter((service) => service.id !== serviceId));
      alert('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service.');
    }
  };

  return (
    <div className="homePage-wrapper">
      <div className="search-bar-container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="filters-container">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <Container className="userHomePage">
        <Row>
          {filteredServices.map((service) => (
            <Col key={service.id} xs={12} sm={6} md={4} lg={3}>
              <AdminServiceCard service={service} onDelete={handleDeleteService} canEdit={true} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserHomePage;
