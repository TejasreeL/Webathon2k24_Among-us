import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import { Col, Container, Row } from 'reactstrap';
import tourData from '../assets/data/tours'; 

const Tours = () => {
   const [pageCount, setPageCount] = useState(0);
   const [page, setPage] = useState(0);

   // Simulate data fetching
   useEffect(() => {
      // Calculate pageCount based on tourData length
      const pages = Math.ceil(tourData.length / 8);
      setPageCount(pages);
      window.scrollTo(0, 0);
   }, [page]);

   // Paginate tourData
   const paginatedTours = tourData.slice(page * 8, (page + 1) * 8);

   return (
      <>
         <CommonSection title={"All Tours"} />
         <section>
            <Container>
               <Row>
                  <SearchBar />
               </Row>
            </Container>
         </section>

         <section className='pt-0'>
            <Container>
               <Row>
                  {paginatedTours.map(tour => (
                     <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
                        <TourCard tour={tour} />
                     </Col>
                  ))}
               </Row>

               <Col lg='12'>
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                     {[...Array(pageCount).keys()].map(number => (
                        <span
                           key={number}
                           onClick={() => setPage(number)}
                           className={page === number ? 'active__page' : ''}
                        >
                           {number + 1}
                        </span>
                     ))}
                  </div>
               </Col>
            </Container>
         </section>
         <Newsletter />
      </>
   );
};

export default Tours;
