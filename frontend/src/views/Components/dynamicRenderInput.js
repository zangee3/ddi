import React from "react";

const DynamicRenderInput = () => {
    const fieldRows = (val) => {
        return (
            <div className="form-group">
                <label className={"d-block mb-2 font-weight-bold"}>IP {val}:</label>
                <input
                    type="text"
                    className="form-control"
                    name={`ip_${val}`}
                    ref={register({ required: true })}
                    defaultValue={"test"}
                />
            </div>
        );
    };

    const renderTxtFields = () => {
        const val = quantity;
        let rows = [];
        for (let i = 1; i <= val; i++) {
            rows.push(fieldRows(i));
        }
        return <div>{rows}</div>;
    };
}
