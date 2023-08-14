import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube, { YouTubeProps } from 'react-youtube'
import ProductCard from '../components/ProductCard'
import CommentCard from '../components/CommentCard'

interface Product {
    productID: string
    linkProduct: string
    title: string
    price: number
    _id: string
}

interface CommentList {
    username: string
    comment: string
    _id: string
}

interface CommentDetail {
    comment_list: CommentList[]
    _id: string
}

interface VideoDetail {
    _id: string
    product_list: Product[]
}

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null)
    const [comments, setComments] = useState<CommentDetail | null>(null)
    const [newComment, setNewComment] = useState({ username: '', comment: '' })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newComment.username && newComment.comment) {
            fetch(
                `https://sleepy-pink-agouti.cyclic.cloud/api/videos/comment/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment),
                },
            )
                .then((response) => response.json())
                .then(() => {
                    setNewComment({ username: '', comment: '' })
                    window.location.reload()
                })
                .catch((error) => console.error('Error adding comment:', error))
        }
    }

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo()
    }

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    }

    useEffect(() => {
        fetch(`https://sleepy-pink-agouti.cyclic.cloud/api/videos/${id}`)
            .then((response) => response.json())
            .then((data) => setVideoDetail(data.data))
            .catch((error) => console.error('Error fetching data:', error))

        fetch(
            `https://sleepy-pink-agouti.cyclic.cloud/api/videos/comment/${id}`,
        )
            .then((response) => response.json())
            .then((data) => setComments(data.data))
            .catch((error) => console.error('Error fetching comments:', error))
    }, [id])

    return (
        <div className='bg-gray-200 h-screen'>
            <div className='bg-gray-200 grid grid-cols-4 gap-4 p-4'>
                <div className='col-span-1'>
                    <h2 className='text-xl font-semibold mb-4'>
                        List Products
                    </h2>
                    <div className='space-y-2'>
                        {videoDetail?.product_list.map((product) => (
                            <ProductCard
                                key={product._id}
                                title={product.title}
                                price={product.price}
                                linkProduct={product.linkProduct}
                            />
                        ))}
                    </div>
                </div>

                <div className='col-span-2'>
                    <YouTube
                        videoId={videoDetail?._id}
                        opts={opts}
                        onReady={onPlayerReady}
                    />
                </div>

                <div className='col-span-1'>
                    <div className='space-y-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor='username'>Username:</label>
                                <hr />
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={newComment.username}
                                    onChange={(e) =>
                                        setNewComment({
                                            ...newComment,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='comment'>Comment:</label>
                                <hr />
                                <textarea
                                    id='comment'
                                    name='comment'
                                    rows={4}
                                    cols={40}
                                    value={newComment.comment}
                                    onChange={(e) =>
                                        setNewComment({
                                            ...newComment,
                                            comment: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type='submit'
                                className='bg-blue-400 p-2 rounded-lg text-white'
                            >
                                Add Comment
                            </button>
                        </form>

                        <div className='space-y-2'>
                            {comments?.comment_list.map((comment) => (
                                <CommentCard
                                    key={comment._id}
                                    username={comment.username}
                                    comment={comment.comment}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
