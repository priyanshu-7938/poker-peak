import React from "react";

export default function Button({ data, func }){
    return (
        <button className={`w-[${data?.w}px] h-[${data?.h}px] rounded-[${data?.r}px] bg-[${data?.bg}] text-[${data?.foreground}] border-${data?.border} border-[${data?.borderColor}]`}>
            {data?.text}
        </button>
    )
}