import React from 'react'

/////////////---Icon imports---////////////////////
import { AlertTriangle, CheckCircle, CircleX, Info } from "lucide-react";



const Notification = ({ messageType, position, messageTitle, content, backgroundColor, borderColor, textColor }) => {

  function hexToRgba(hex, alpha) {
    // Remove leading #
    hex = hex.replace(/^#/, "");

    // Expand shorthand form (#03F → #0033FF)
    if (hex.length === 3) {
      hex = hex.split("").map(x => x + x).join("");
    }

    // Parse into r, g, b
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        borderWidth: "1px",
        borderColor: `${hexToRgba(borderColor, 0.3)}`,
        boxShadow: `0 10px 15px -3px ${hexToRgba(borderColor, 0.4)}, 0 4px 6px -4px ${hexToRgba(borderColor, 0.4)}`
      }}
      className={`w-[95%] mx-auto flex flex-col py-1 px-3 rounded-lg`}>
      <div
        className='w-full flex flex-row items-center'>
        {messageType === 'Information' && <Info size={16} className='text-blue-500' />}
        {messageType === 'Warning' && <AlertTriangle size={16} className='text-amber-500' />}
        {messageType === 'Error' && <CircleX size={16} className='text-red-500' />}
        <p style={{ color: `${textColor}` }} className={`text-lg font-semibold ml-3`}>
          {messageTitle}
        </p>
      </div>
      <p style={{ color: `${textColor}` }} className={`text-sm mt-2`}>
        {content}
      </p>
    </div>
  )
}

export default Notification