import React from 'react';
import RenderFields from "./RenderFields";
class DNSOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
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
    console.log(value);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          A-Record Entries:
          <select value={value} onChange={this.handleChange}>
            <option value="0"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        {
          value ? <RenderFields value={value} /> : null
        }
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default DNSOptions;