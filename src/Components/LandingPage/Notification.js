import React from 'react'

/////////////---Icon imports---////////////////////
import { AlertTriangle, CheckCircle, CircleX, Info } from "lucide-react";



const Notification = ({messageType, position, messageTitle, content}) => {
  return (
    <div className={`w-[95%] mx-auto flex flex-col py-1 px-3 bg-muted border border-primary/30 shadow-lg shadow-primary/40 rounded-lg`}>
      <div 
        className='w-full flex flex-row items-center'>
        {messageType === 'Information' && <Info size={16} className='text-blue-500' />}
        {messageType === 'Warning' && <AlertTriangle size={16} className='text-amber-500' />}
        {messageType === 'Error' && <CircleX size={16} className='text-red-500' />}
        <p
          className={`text-lg font-semibold text-foreground ml-3`}>
          {messageTitle}
        </p>
      </div>
      <p className={`text-sm text-foreground mt-2`}>
        {content}
      </p>
    </div>
  )
}

export default Notification