import React from 'react'

interface ProductCardProps {
    title: string
    price: number
    linkProduct: string
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    linkProduct,
}) => {
    const handleCardClick = () => {
        window.open(linkProduct, '_blank')
    }

    return (
        <div
            className='product-card bg-white rounded-lg shadow p-4 cursor-pointer'
            onClick={handleCardClick}
        >
            <h3 className='mb-2'>{title}</h3>
            <hr className='my-2 border-gray-300' />
            <p className='text-sm'>Price: Rp. {price},-</p>
        </div>
    )
}

export default ProductCard
