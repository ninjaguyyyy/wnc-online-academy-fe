import React from 'react'
import { Container,Card,Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import no1 from 'assets/image/5.jpg'
import Pagination from 'react-bootstrap/Pagination'
function index() {
  const items = [
    {
      id: 1,
      name: 'no1',
      title: 'text no1'
    },
    {
      id: 2,
      name: 'no2',
      title: 'text no2'
    },
    {
      id: 3,
      name: 'no3',
      title: 'text no3'
    },
    {
      id: 4,
      name: 'no4',
      title: 'text no4'
    },
    {
      id: 5,
      name: 'no5',
      title: 'text no5 '
    }
  ]
  return (
    <Container style={{ display:'flex'}}>
     <div>Filter</div>
     <div style={{ flexDirection:'column'}}>
      {<Container fluid>
        <Row xs={1} md={1} >
          {items.map((item, idx) => (
            <Link to={`/course/${item.id}`}>
              <Col style={{ padding: '20px' }}>
                <Card style={{ flexDirection:'row'}}>
                  <Card.Img variant="top" src={no1}  className='card__item__img'/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Title>Teacher</Card.Title>
                    <Card.Text style={{ display:'flex', justifyContent:'space-between'}}>
                      {item.title}
                      <div style={{display:'flex' }}>
                        {Array(4)
                          .fill()
                          .map((_, i) => (
                            <p>⭐️</p>
                          ))}
                      </div>

                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>

          ))}
        </Row>
      </Container>}
      <Pagination style={{ justifyContent:'center'}}>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Item>{6}</Pagination.Item>
        <Pagination.Next />
    </Pagination>
     </div>

    </Container>
  )
}

export default index
