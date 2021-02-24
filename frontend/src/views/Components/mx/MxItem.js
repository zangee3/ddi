import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const MxItem = () => {
    return (
        <table className='table table-bordered bg-white mt-5'>
            <thead>
            <tr>
                <th>Host</th>
                <th>Domain</th>
                <th className='text-center'>Actions</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>@</td>
                <td>ahmed.test2.com</td>
                <td>
                    <div className='d-flex justify-content-around'>
                    <span style={{cursor: 'pointer'}}>
                      <FontAwesomeIcon
                          icon={faTimesCircle}
                          className={'text-danger'}
                      />
                    </span>

                        <span style={{cursor: 'pointer'}}>
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
    )
}

export default MxItem
