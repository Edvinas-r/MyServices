import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminServiceCard from '../components/Services/AdminServiceCard';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filters';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AdminHomePage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('userToken');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('http://localhost:3001/api/services', authHeaders);
        const categoriesResponse = await axios.get('http://localhost:3001/api/categories', authHeaders);

        setServices(servicesResponse.data.data);
        setFilteredServices(servicesResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      await axios.delete(`http://localhost:3001/api/services/${serviceId}`, authHeaders);
      const updatedServices = filteredServices.filter((service) => service.id !== serviceId);
      setFilteredServices(updatedServices);
      alert('Service deleted successfully!');
      navigate('/admin');
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

      <Container className="adminHomePage">
        <Row>
          {filteredServices.map((service) => (
            <Col key={service.id} xs={12} sm={6} md={4} lg={3}>
              <AdminServiceCard service={service} onDelete={handleDeleteService} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminHomePage;
