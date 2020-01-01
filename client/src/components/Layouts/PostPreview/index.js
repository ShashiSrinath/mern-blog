import React from 'react';
import './postPreview.scss'
import {Link} from "react-router-dom";

const PostPreview = ({post, size}) => {
    return (
        <Link to={`/post/${post.slug}`}>
            <div className='card  post-preview shadow-sm'>
                <div className='preview-img-container'>
                    <img src={post.featuredImage} className='preview-img'/>
                    <div className='post-preview-meta-container'>
                        <div className='badge'>{post.category.name}</div>
                    </div>
                </div>
                <div className='post-preview-header-container'>
                    <h3 className='post-title'>{post.title}</h3>
                    <div className='d-flex justify-content-between'>
                        <div className='text-muted'>Views: {post.views}</div>
                        <div className='text-muted text-sm-right'>{new Date(post.addedDate).toDateString()}</div>
                    </div>
                </div>
                {size !== 'small' ?
                    <div className='card-subtitle text-muted post-preview-description'>{post.description}</div> : null}
            </div>
        </Link>
    );
};

export default PostPreview;