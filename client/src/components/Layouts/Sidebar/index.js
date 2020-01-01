import React, {useContext, useEffect} from 'react';
import './sidebar.scss';
import {GlobalContext} from "../../../context/GlobalState";
import PostPreview from "../PostPreview";

const Sidebar = () => {

    const {
        recentPosts: {state: recentPosts, fetch: fetchRecent},
        trendingPosts: {state: trendingPosts, fetch: fetchTrending}
    } = useContext(GlobalContext);

    useEffect(() => {
        fetchRecent(0);
        fetchTrending();
    }, []);


    const Recent = () => {
        return (
            <>
                {recentPosts[0] ? recentPosts[0].map(currentPost => (
                    <PostPreview key={currentPost._id} post={currentPost} size='small'/>)) : null}
            </>
        );
    };

    const Trending = () => {
        return (
            <>
                {trendingPosts.map(currentPost => (
                    <PostPreview key={currentPost._id} post={currentPost} size='small'/>))}
            </>
        );
    };

    return (
        <div className='d-flex flex-wrap m-3'>
            <div className='sidebar ml-auto'>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item ml-3">
                        <a className="nav-link active" id="pills-recent-tab" data-toggle="pill" href="#pills-recent"
                           role="tab"
                           aria-controls="pills-recent" aria-selected="false">Recent</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-trending-tab" data-toggle="pill" href="#pills-trending"
                           role="tab"
                           aria-controls="pills-trending" aria-selected="true">Trending</a>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-recent" role="tabpanel"
                         aria-labelledby="pills-profile-tab"><Recent/>
                    </div>
                    <div className="tab-pane fade " id="pills-trending" role="tabpanel"
                         aria-labelledby="pills-trending-tab"><Trending/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;