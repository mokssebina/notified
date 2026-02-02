import React, { Fragment } from 'react'

/////////////---Icon imports---////////////////////
import { AlertTriangle, CheckCircle, CircleX, Info, X, ExternalLink } from "lucide-react";



const Notification = ({ messageType, position, messageTitle, content, backgroundColor, borderColor, textColor, selected }) => {

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

  const filterButton = (type) => {
    if (type === "external") {
        return 'Open'
    } else if (type === "navigate") {
        return 'Go to'
    } else if (type === "dismiss") {
        return 'Close'
    } else {
        return ''
    }
}

  return (
  <div
      className="w-[95%] h-full mx-auto flex flex-row p-3 rounded-lg border"
      style={{
        backgroundColor: backgroundColor,
        borderColor: hexToRgba(borderColor, 0.3),
        boxShadow: `0 10px 15px -3px ${hexToRgba(
          borderColor,
          0.4
        )}, 0 4px 6px -4px ${hexToRgba(borderColor, 0.4)}`,
      }}
    >
      {/* LEFT SECTION */}
      <div
        className={`h-full flex flex-col ${
          selected === "view only" ? "w-full" : `w-4/5 border-r border-[${textColor}]`
        }`}
      >
        {/* Header */}
        <div className="relative w-full flex flex-row items-center">
          {messageType === "Information" && (
            <Info size={16} className="text-blue-500" />
          )}
          {messageType === "Warning" && (
            <AlertTriangle size={16} className="text-amber-500" />
          )}
          {messageType === "Error" && (
            <CircleX size={16} className="text-red-500" />
          )}

          <p
            className="text-lg font-semibold ml-3"
            style={{ color: textColor }}
          >
            {messageTitle}
          </p>
        </div>

        {/* Content */}
        <p
          className="text-xs mt-1"
          style={{ color: textColor }}
        >
          {content}
        </p>

      </div>

      {/* RIGHT SECTION */}
      {selected !== "view only" && (
        <div
          className="w-1/5 h-4 my-auto flex justify-center items-center"
        >
          <p
            className={`text-base text-[${textColor}] cursor-pointer transition-colors`}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = borderColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "white")
            }
          >
            {filterButton('')}
          </p>
        </div>
      )}
    </div>
  
  )
}

export default Notification

{/*
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        borderWidth: "1px",
        borderColor: `${hexToRgba(borderColor, 0.3)}`,
        boxShadow: `0 10px 15px -3px ${hexToRgba(borderColor, 0.4)}, 0 4px 6px -4px ${hexToRgba(borderColor, 0.4)}`
      }}
      className={`w-[95%] h-full mx-auto flex flex-row py-3 px-3 rounded-lg`}
    >

      <div className='w-4/5 h-full border-r border-white flex flex-col'>

        <div className='relative w-full flex flex-row items-center'>

          {messageType === 'Information' && <Info size={16} className='text-blue-500' />}
          {messageType === 'Warning' && <AlertTriangle size={16} className='text-amber-500' />}
          {messageType === 'Error' && <CircleX size={16} className='text-red-500' />}
          <p style={{ color: `${textColor}` }} className={`text-lg font-semibold ml-3`}>
            {messageTitle}
          </p>
        </div>

        <p style={{ color: `${textColor}` }} className={`text-xs mt-1`}>
          {content}
        </p>

      </div>

      <button className='w-1/5 h-4 my-auto flex items-center justify-center'>
          <p 
          className='text-base text-white cursor-pointer hover:text-amber-500'
          onMouseEnter={(e) => (e.currentTarget.style.color = `${borderColor}`)} // hover:text-amber-500
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          >Close</p>
      </button>

    </div>
  */}