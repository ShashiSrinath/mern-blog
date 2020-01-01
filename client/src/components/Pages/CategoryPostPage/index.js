import React, {useState, useEffect, useContext} from 'react';
import './categoryPostPage.scss'
import PostPreview from "../../Layouts/PostPreview";
import {GlobalContext} from "../../../context/GlobalState";
import PostNavigationBar from "../../Layouts/PageNavigationBar";
import {withRouter} from "react-router-dom";

const CategoryPostPage = (props) => {
    const [page, setPage] = useState(0);
    const {categoryPosts: {state: posts, fetch, count}} = useContext(GlobalContext);

    useEffect(() => {
        fetch(props.match.params.name, page);
    }, [page,props.match.params.name]);


    return (
        <div className='recent-page'>
            <PostNavigationBar state={{page, setPage}} count={count}/>
            <div className='container-fluid mt-3 mb-3'>
                {posts[props.match.params.name] && posts[props.match.params.name][page]?
                    <div className='row shadow-lg'>
                        {posts[props.match.params.name][page].map(post => <div className='col-4' key={post._id}><PostPreview post={post}/>
                        </div>)}
                    </div> : null}
                <PostNavigationBar state={{page, setPage}} count={count}/>
            </div>
        </div>
    );
};

export default withRouter(CategoryPostPage);