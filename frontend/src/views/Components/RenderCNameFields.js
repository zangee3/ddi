import React from 'react';

const FieldRows = (props) => {
  const { val } = props;
  return (
    <div className="form-row">
      <div className="form-group col-md-6">
        <label>Hostname {val}:</label>
        <input type="text" className="form-control" placeholder=""/>
      </div>
      <div className="form-group col-md-6">
        <label>Target A Record {val}:</label>
        <input type="text" className="form-control" placeholder=""/>
      </div>
    </div>
  )
};

function RenderCNameFields(props) {

  const { value } = props;
  const val = value && parseInt(value);
  let rows = [];
  for (let i = 1; i <= val; i++) {
    rows.push(<FieldRows key={i} val={i}/>);
  }
  return (
    <div>
      {rows}
    </div>
  )
};

export default RenderCNameFields;