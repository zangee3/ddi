import React from 'react';
import RenderTxtFields from './RenderTxtFields';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class TxtOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    alert('Your Selected Number of DNS Entries are: ' + value);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <div className='m-bottom'>
        <form onSubmit={this.handleSubmit}>
          <h6>TXT Records</h6>
          <div className='row d-flex'>
            <div className='col-md-6 '>
              <div className='form-group '>
                <label
                  htmlFor='exampleFormControlSelect2'
                  className='d-block mb-2 font-weight-bold'
                >
                  Select quantity of TXT Records
                </label>
                <select
                  value={value}
                  onChange={this.handleChange}
                  className='form-control'
                  id='exampleFormControlSelect2'
                >
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </div>
          </div>
          {value ? <RenderTxtFields value={value} /> : null}
          {/*<button type="submit" className="btn btn-primary">Submit</button>*/}
          <table className='table table-bordered bg-white mt-5'>
            <thead>
              <tr>
                <th>Name</th>
                <th>IP</th>
                <th class='text-center'>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>ahmed.test2.com</td>
                <td>1.1.1.2 / 3.4.5.6</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={'text-danger'}
                      />
                    </span>

                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={'text-primary'}
                      />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>ahmed.test2.com</td>
                <td>1.1.1.2 / 3.4.5.6</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={'text-danger'}
                      />
                    </span>

                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={'text-primary'}
                      />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>ahmed.test2.com</td>
                <td>1.1.1.2 / 3.4.5.6</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={'text-danger'}
                      />
                    </span>

                    <span style={{ cursor: 'pointer' }}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={'text-primary'}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default TxtOptions;
