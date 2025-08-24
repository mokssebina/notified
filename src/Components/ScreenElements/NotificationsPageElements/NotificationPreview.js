import React from 'react'
import { InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';



const NotificationPreview = ({ label, textColor, backgroundColor, borderColor, type, title, content }) => {

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
        <>
            <p className='text-foreground text-sm/6 mb-3'>{label}</p>

            <div className='w-full px-3 py-4 bg-muted rounded-lg'>

                <div style={{
                    backgroundColor: `${backgroundColor}`,
                    borderWidth: "1px",
                    borderColor: `${hexToRgba(borderColor, 0.3)}`,
                    boxShadow: `0 10px 15px -3px ${hexToRgba(borderColor, 0.4)}, 0 4px 6px -4px ${hexToRgba(borderColor, 0.4)}`
                }}
                    className={`w-full md:w-[400px] mx-auto flex flex-col rounded-lg py-2 px-3`}>

                    <div className='w-full flex flex-row'>

                        {type === 'Information' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>ℹ</p>}
                        {type === 'Warning' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>⚠️</p>}
                        {type === 'Error' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>‼️</p>}
                        <p style={{ color: `${textColor}` }} className={`text-base font-semibold ml-3`}>{title}</p>
                    </div>

                    <div className='w-full py-2 h-auto'>
                        <p style={{ color: `${textColor}` }} className={`text-sm`}>{content}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NotificationPreview