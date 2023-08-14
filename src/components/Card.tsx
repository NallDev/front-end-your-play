import React from 'react'

interface CardProps {
    imageUrl: string
}

const Card: React.FC<CardProps> = ({ imageUrl }) => {
    return (
        <div className='w-64 mx-auto p-4 bg-white rounded-lg shadow'>
            <img src={imageUrl} alt='Card' className='w-full h-auto' />
        </div>
    )
}

export default Card
