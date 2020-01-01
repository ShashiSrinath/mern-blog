import React from 'react';
import './categoryPreview.scss'
import {Link} from "react-router-dom";

const CategoryPreview = ({category}) => {
    return (
        <Link to={`/category/${category.name}`}>
            <div className='card  category-preview shadow-sm'>
                <div className='preview-img-container'>
                    <img src={category.featuredImage} className='preview-img'/>
                    {/*<div className='post-preview-meta-container'>*/}
                    {/*    <div className='badge'>{post.category.name}</div>*/}
                    {/*    <div className='ml-auto text-muted'>PostPage Count: {category.}</div>*/}
                    {/*</div>*/}
                </div>
                <div className='category-preview-header-container'>
                    <h3 className='category-title'>{category.name}</h3>
                </div>
                    <div className='card-subtitle text-muted category-preview-description'>{category.description}</div>
            </div>
        </Link>
    );
};

export default CategoryPreview;