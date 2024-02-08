import React from "react";
import load from "/assets/spinner.svg"

export default function Loading(){
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <img src={load}
                    className='bg-black'
                    alt="" />
            </div>
        </>
    )
}