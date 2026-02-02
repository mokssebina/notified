import React from 'react'
import { InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

/////////////---Icon imports---////////////////////
import { AlertTriangle, CheckCircle, CircleX, Info } from "lucide-react";


const NotificationPreview = ({ label, textColor, backgroundColor, borderColor, type, title, content, selected }) => {

    function hexToRgba(hex, alpha) {

        if (typeof hex !== "string") return null;

        // Remove leading #
        hex = hex?.replace(/^#/, "");

        // Expand shorthand form (#03F → #0033FF)
        if (hex.length === 3) {
            hex = hex.split("").map(x => x + x).join("");
        }

        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return null;

        const bigint = parseInt(hex, 16);
        return `rgba(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}, ${alpha})`;

        // Parse into r, g, b
        /*
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        */
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
        <>
            <p className='text-foreground text-sm/6 mb-3'>{label}</p>

            <div className='w-full px-3 py-4 bg-muted rounded-lg'>

                <div
                    className="w-full md:w-[400px] mx-auto flex flex-row rounded-lg py-2 px-3"
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
                        style={{ borderColor: textColor }}
                        className={`h-full flex flex-col ${selected === "view only" ? "w-full" : `w-4/5 border-r`
                            }`}
                    >
                        {/* Header */}
                        <div className="relative w-full flex flex-row items-center">
                            {type === "Information" && (
                                <Info size={16} className="text-blue-500" />
                            )}
                            {type === "Warning" && (
                                <AlertTriangle size={16} className="text-amber-500" />
                            )}
                            {type === "Error" && (
                                <CircleX size={16} className="text-red-500" />
                            )}

                            <p
                                className="text-lg font-semibold ml-3"
                                style={{ color: textColor }}
                            >
                                {title}
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
                                style={{ color: textColor }}
                                className={`text-base cursor-pointer transition-colors`}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = borderColor)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "white")
                                }
                            >
                                {filterButton(selected)}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default NotificationPreview