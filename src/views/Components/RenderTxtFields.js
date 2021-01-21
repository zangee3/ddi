import React from 'react';

const FieldRows = (props) => {
  const { val } = props;
  return (
    <div className="form-row">
      <div className="form-group col-md-6">
        <label>IP {val}:</label>
        <input type="text" className="form-control" placeholder=""/>
      </div>
    </div>
  )
};

function RenderTxtFields(props) {

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

export default RenderTxtFields;