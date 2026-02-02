import React from 'react'

//////////////---Material UI imports---////////////////////
import StyleIcon from '@mui/icons-material/Style';

//////////////---Context imports---////////////////////
import { useAuth } from '../../../Context/AuthContext';




const PayCard = ({type, buypackage, features, price, button, id, quantity, credits}) => {

    const { openCheckout } = useAuth()

    return (
        <div className='w-full flex flex-row p-2 md:p-4 rounded-lg mb-10'>
            <div className='w-1/3 md:w-1/3 h-full'>
                <div className='w-full mx-auto'>
                    <p className='text-lg md:text-xl font-semibold mt-10 text-primary'>{type}</p>
                    <ul className='text-sm list-none'>
                        {features?.map((item) => (
                            <li key={item.id} className="before:content-['🔥'] before:mr-2 pl-6 indent-[-1.5rem] mb-2">{item.perk}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='w-2/3 h-full flex flex-col'>
                <div className='w-3/4 h-auto mx-auto'>
                    <p className='text-case font-semibold mb-4'>{buypackage}</p>
                </div>
                <div className='w-3/4 h-auto mx-auto mt-auto text-center'>
                    <p className='text-lg text-primary mb-4'>{`US$${price}`}</p>
                    <button onClick={() => openCheckout(id, quantity, credits)} className='w-full h-12 rounded-lg border-2 border-primary text-primary hover:border-solid border-dashed'>{button}</button>
                </div>
            </div>
        </div>
    )
}

export default PayCard