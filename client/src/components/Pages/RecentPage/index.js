import React, {useState, useEffect, useContext} from 'react';
import './recentPage.scss'
import PostPreview from "../../Layouts/PostPreview";
import {GlobalContext} from "../../../context/GlobalState";
import PageNavigationBar from "../../Layouts/PageNavigationBar";
import {withRouter} from "react-router-dom";

const RecentPostsPage = (props) => {
    const [page,setPage] = useState(0);
    const {recentPosts: {state: posts, fetch , count}} = useContext(GlobalContext);

    useEffect(() => {
        fetch(page);
    }, [page]);

    return (
        <div className='recent-page'>
            <PageNavigationBar state={{page,setPage}} count={count}/>
            <div className='container-fluid mt-3 mb-3'>
                {posts[page] ?
                <div className='row shadow-lg'>
                    {posts[page].map(post => <div className='col-4' key={post._id}><PostPreview post={post}/></div>)}
                </div> : null}
                <PageNavigationBar state={{page,setPage}} count={count}/>
            </div>
        </div>
    );
};

export default withRouter(RecentPostsPage);