import React from 'react'

interface CommentCardProps {
    username: string
    comment: string
}

const CommentCard: React.FC<CommentCardProps> = ({ username, comment }) => {
    return (
        <div className='comment-card bg-white rounded-lg shadow p-4'>
            <div className='username font-medium'>{username}</div>
            <hr className='my-2 border-gray-300' />
            <div className='comment'>{comment}</div>
        </div>
    )
}

export default CommentCard
