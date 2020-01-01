import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './postPage.scss'
import avatar from '../../../assets/images/avatar.png';
import {Link, withRouter} from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

const PostPage = (props) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const postSlug = props.match.params.slug;
        axios.get(`http://localhost:4000/api/v1/posts/get-by-slug/${postSlug}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err));

        //scroll to top on post change
        window.scrollTo(0, 0);
    }, [props.match.params.slug]);

    const PostContent = () => (
        <div className='post-page'>
            <div className='container-fluid  mt-3 mb-3'>
                <img src={post.featuredImage} className='post-featured-image shadow-lg'/>
                <div className='img-dark-overlay'/>
                <div className='space-v-20'/>
                <div className='card m-1 shadow-lg post-container-card'>
                    <div className='row'>
                        <div className='col-8'>
                            <h1 className='post-title text-center'>{post.title}</h1>
                            <div className='post-meta-container m-3'>
                                <div className='author-avatar-container'>
                                    <img src={avatar} className={'user-avatar'}/>
                                    <div className='d-flex flex-column'>
                                        <div className='text-muted'>Shashi</div>
                                        <div
                                            className='text-sm-center text-center text-muted'>{new Date(post.addedDate).toDateString()}</div>
                                    </div>
                                </div>
                                <div className='mt-4 d-flex'>
                                    <h3 className='post-category'><Link
                                        to={`/category/${post.category.name}`}>{post.category.name}</Link></h3>
                                </div>
                                <div className='d-flex flex-wrap'>
                                    {post.tags.map(tag => (
                                        <Link to={`/tag/${tag.name}`} key={tag._id}>
                                            <span className='post-tag'>{tag.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className='text-muted post-content m-5'
                                 dangerouslySetInnerHTML={{__html: post.content}}/>
                        </div>
                        <div className='col-4'>
                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {post ? <PostContent/> : null}
        </>
    );
};

export default withRouter(PostPage);