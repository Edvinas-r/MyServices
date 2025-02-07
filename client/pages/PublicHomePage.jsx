import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filters';
import PublicServiceCard from '../components/Services/PublicServicesCard';
import './AuthPage.css';

const PublicHomePage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('http://localhost:3001/api/services');

        const categoriesResponse = await axios.get('http://localhost:3001/api/categories');

        setServices(servicesResponse.data.data);
        setFilteredServices(servicesResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
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
      filtered = filtered.filter((service) => service.category_id === parseInt(selectedCategory, 10));
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, services]);

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

      <Container className="publicHomePage">
        <Row>
          {filteredServices.map((service) => (
            <Col key={service.id} xs={12} sm={6} md={4} lg={3}>
              <PublicServiceCard service={service} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PublicHomePage;
