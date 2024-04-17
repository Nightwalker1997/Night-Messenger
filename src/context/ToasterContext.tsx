'use client';

import { Toaster } from 'react-hot-toast';

const ToasterContext = () => {
    return (
        <Toaster 
            position="top-center" // {top, bottom}-{left, center, right}
            reverseOrder={false}  // Toggle Direction [first come  stand on top OR reserver]
        />
    )
}


export default ToasterContext;