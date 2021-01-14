import React from "react";
import RenderMXFields from "./RenderMXFields";

class MXOptions extends React.Component {
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
    alert("Your Selected Number of DNS Entries are: " + value);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    console.log(value);
    return (
      <div className="m-bottom">
        <form onSubmit={this.handleSubmit}>
          <h6>MX Records</h6>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">
              Select quantity of TXT Records
            </label>
            <select
              value={value}
              onChange={this.handleChange}
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {value ? <RenderMXFields value={value} /> : null}
          {/*<button type="submit" className="btn btn-primary">Submit</button>*/}
        </form>
      </div>
    );
  }
}

export default MXOptions;
