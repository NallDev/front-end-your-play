import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

interface Video {
    _id: string
    url_img: string
}

const Home: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([])

    useEffect(() => {
        fetch('https://sleepy-pink-agouti.cyclic.cloud/api/videos/')
            .then((response) => response.json())
            .then((data) => setVideos(data.data))
            .catch((error) => console.error('Error fetching data:', error))
    }, [])

    return (
        <div className='bg-gray-200 h-screen'>
            <div className='bg-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {videos.map((video) => (
                    <Link
                        key={video._id}
                        to={`${video._id}`}
                        className='cursor-pointer'
                    >
                        <Card imageUrl={video.url_img} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
