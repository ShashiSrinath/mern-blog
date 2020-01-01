import React, {useEffect, useState} from 'react';
import WYSIWYGEditor from "../../Layouts/WYSIWYGEditor";
import useFormInput from "../../../hooks/useFormInput";
import './createPost.scss';

const CreatePost = () => {
    const [content, setContent] = useState('<p>Default content</p>');
    const [title , titleHandler] = useFormInput();
    const [slug , slugHandler] = useFormInput();

    return (
        <div>
            <div className='container-fluid  mb-3 bg-overlay'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='m-5 card p-3 post-edit-content'>
                            <div className="form-group">
                                <label htmlFor="post-title">Post Title</label>
                                <input type="text" className="form-control" id="post-title"
                                       aria-describedby="emailHelp" placeholder="Enter the post title" value={title} onChange={titleHandler}/>
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="post-slug">Slug</label>
                                <input type="text" className="form-control" id="post-slug"
                                       aria-describedby="emailHelp" placeholder="Enter the slug" value={slug}
                                       onChange={slugHandler}/>
                            </div>
                            <label>Content</label>
                            <WYSIWYGEditor content={content} setContent={setContent}/>
                        </div>
                    </div>
                    <div className='col-4 mt-5'>
cc
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;