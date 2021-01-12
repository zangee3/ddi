import React from 'react';

const FieldRows = (props) => {
  const { val } = props;
  return (
    <div>
      <label>
        Name {val}:
        <input type="text"/>
      </label>
    </div>
  )
}

function RenderFields(props) {

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

}

export default RenderFields;