import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Api from '../Api';
import './BookDetail.scss';

class BookDetail extends Component {
  state = {
    details: {},
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.getDetails();
  }

  getDetails = async () => {
    const { data } = await Api.get(
      `api/books?bibkeys=ISBN:${this.props.book.id}&jscmd=data&format=json`
    );

    const details = data[`ISBN:${this.props.book.id}`];

    if (details) {
      this.setState({
        details: {
          subtitle: details.subtitle || null,
          publishDate: details.publish_date || null,
          numberOfPages: details.number_of_pages || null,
          cover: (details.cover && details.cover.medium) || null,
        },
        loading: false,
      });
    }
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.props.book.title}</Card.Title>
          <Card.Subtitle>{this.state.details.subtitle}</Card.Subtitle>
          <Container>
            <Row>
              <Col xs={12} sm={3}></Col>
              <Col xs={12} sm={1}>
                <div className='cover'>
                  <img src={this.state.details.cover} alt='' />
                </div>
              </Col>
              <Col xs={12} sm={8}>
                <Row>
                  <Col xs={5} sm={2}>
                    Author:
                  </Col>
                  <Col>{this.props.book.author}</Col>
                </Row>
                <Row>
                  <Col xs={5} sm={2}>
                    Publish Date:
                  </Col>
                  <Col>{this.state.details.publishDate}</Col>
                </Row>
                <Row>
                  <Col xs={5} sm={2}>
                    Pages:
                  </Col>
                  <Col>{this.state.details.numberOfPages}</Col>
                </Row>
                <Row>
                  <Col xs={5} sm={2}>
                    Read On:
                  </Col>
                  <Col>
                    {moment(this.props.book.readOn).format('MMMM Do YYYY')}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

BookDetail.propTypes = {
  book: PropTypes.object,
};

export default BookDetail;
