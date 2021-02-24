import React, {useState} from 'react';
import MxItem from "./MxItem";
import {useForm} from "react-hook-form";
import service from "../../../service/service";

const MXOptions = () => {
    const [quantity, setQuantity] = useState(1);
    const {register, handleSubmit} = useForm();

    const submitForm = async (value) => {
        let formData = []
        for(let i = 0; i < Object.keys(value).length; i++) {
            if(value[i] !== undefined) {
                formData.push({
                    name: value[i],
                    mail_exchanger: value[`${i}_me`]
                })
            }
        }

        try {
            await service.post("/mx/addMXRecord", formData);
        } catch (e) {
            console.log(e)
        }

    }

    const fieldRows = (val) => {
        return (
            <div className='row d-flex'>
                <div className=' col-md-6'>
                    <div className='form-group'>
                        <label className='d-block mb-2 font-weight-bold'>Host {val}:</label>
                        <input type='text' name={val} className='form-control' placeholder='' ref={register({required: true})}/>
                    </div>
                </div>
                <div className=' col-md-6'>
                    <div className='form-group '>
                        <label className='d-block mb-2 font-weight-bold'>Domain {val}:</label>
                        <input type='text' name={`${val}_me`} ref={register({ required: true })} className='form-control' placeholder=''/>
                    </div>
                </div>
            </div>
        );
    };

    /**
     *
     * @returns {JSX.Element}
     */
    const renderMxFields = () => {
        const val = quantity;
        let rows = [];
        for (let i = 1; i <= val; i++) {
            rows.push(fieldRows(i));
        }
        return <div>{rows}</div>;
    }

    return (
        <div className='m-bottom'>
            <form onSubmit={handleSubmit(submitForm)}>
                <h6>MX Records</h6>
                <div className='row d-flex'>
                    <div className='col-md-6 '>
                        <div className='form-group '>
                            <label
                                htmlFor='exampleFormControlSelect2'
                                className='d-block mb-2 font-weight-bold'
                            >
                                Number of TXT Records
                            </label>
                            <select
                                onChange={(e) => setQuantity(e.target.value)}
                                className='form-control'
                                id='exampleFormControlSelect2'
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div>
                    </div>
                </div>

                {renderMxFields()}

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
            {/*<button type="submit" className="btn btn-primary">Submit</button>*/}
            <MxItem/>

        </div>
    );

}

export default MXOptions;
