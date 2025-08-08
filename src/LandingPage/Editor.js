import React from 'react'
import SelectInput from '../Components/Inputs/SelectInput'
import AdvancedInput from '../Components/Inputs/AdvancedInput'
import SimpleInput from '../Components/Inputs/SimpleInput'
import TextAreaInput from '../Components/Inputs/TextAreaInput'
import ColorInput from '../Components/Inputs/ColorInput'




const Editor = ({ messageType, handleMessageType, position, handlePosition, route, handleRoute, messageTitle,
    handleTitle, content, handleContent, backgroundColor, setBackgroundColor, textColor, setTextColor }) => {

    let messagePosition = [
        { id: 1, position: 'Top of page', value: 'top' },
        { id: 2, position: 'Bottom of page', value: 'bottom' }
    ]
    let messageTypes = [
        { id: 1, type: 'Information' },
        { id: 2, type: 'Warning' },
        { id: 3, type: 'Error' }
    ]

    return (
        <div className='w-full h-full flex flex-col mb-8'>

            <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                <div className='relative w-full h-full py-1 md:p-3'>
                    <SelectInput
                        name={''}
                        label={'Select message type'}
                        selectedProject={messageType}
                        handleSelect={handleMessageType}
                        projects={
                            messageTypes?.map((item) => (
                                <option key={item?.id} value={item?.type}>{item?.type}</option>
                            ))}
                    />
                </div>

                <div className='relative w-full h-full py-1 md:p-3'>
                    <SelectInput
                        name={''}
                        label={'Select message position'}
                        selectedProject={position}
                        handleSelect={handlePosition}
                        projects={
                            messagePosition?.map((item) => (
                                <option key={item?.id} value={item?.value}>{item?.position}</option>
                            ))}
                    />
                </div>

            </div>

            <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                    <AdvancedInput label={'Target Route'} type={'text'} placeholder={'Insert route name'} name={''} value={route} onChange={handleRoute} />
                </div>

                <div className='relative w-full h-full py-1 md:p-3'>
                    <SimpleInput label={'Message Title'} type={'text'} placeholder={'Insert message title'} name={''} value={messageTitle} onChange={handleTitle} />
                </div>

            </div>

            <div className='relative w-full p-3'>

                <div className='relative w-full h-full py-1'>
                    <TextAreaInput label={'Message Content'} type={'text'} placeholder={'Insert message content'} name={''} value={content} onChange={handleContent} />
                </div>

            </div>

            <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                    <ColorInput label={'Background Color'} type={'text'} value={backgroundColor} color={backgroundColor} setColor={setBackgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
                </div>

                <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                    <ColorInput label={'Text Color'} type={'text'} value={textColor} color={textColor} setColor={setTextColor} onChange={(event) => setTextColor(event.target.value)} />
                </div>

            </div>

        </div>
    )
}

export default Editor