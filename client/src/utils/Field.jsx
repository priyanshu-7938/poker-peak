import React from "react";

export default function Field({ text, setFunction, values, dataSet }){
    const handleChange = (e) => {
        setFunction(e.target.value);
      };
    return (
        <div className="flex gap-2 m-1 mt-2 tracking-wider">
            <label className="font-amatic font-bold text-sm ">{text}</label>
            <select name="" onChange={handleChange} className="rounded text-sm bg-[#F4EAE0] font-bold" value={values}>
                <option value="" disabled>Select {text}</option>
                {   dataSet.map((string)=>(
                    <option className="font-bold" key={string} value={string}>{string}</option>
                )) }
            </select>
        </div>
    )
}