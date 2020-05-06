import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './ReportButton.scss';

class ReportButton extends Component {
  state = {
    year: new Date().getFullYear(),
  };

  handleInputChange = (e) => {
    this.setState({ year: e.target.value });
  };

  render() {
    return (
      <div className='reportDiv'>
        <span>Annual report:</span>
        <input
          type='number'
          placeholder='Insert year'
          onChange={this.handleInputChange}
          value={this.state.year}
        />
        <Button
          variant='primary'
          size='sm'
          onClick={() => this.props.history.push(`/report/${this.state.year}`)}
        >
          <FontAwesomeIcon icon={faFileInvoice} />
        </Button>
      </div>
    );
  }
}

export default ReportButton;
