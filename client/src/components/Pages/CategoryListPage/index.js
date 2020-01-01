import React, {useContext, useEffect, useState} from 'react';
import PageNavigationBar from "../../Layouts/PageNavigationBar";
import {GlobalContext} from "../../../context/GlobalState";
import CategoryPreview from "../../Layouts/CategoryPreview";

const CategoryListPage = () => {
    const [page,setPage] = useState(0);
    const {categories: {state, fetch , count}} = useContext(GlobalContext);


    useEffect(() => {
        fetch(page);
    }, [page]);

    return (
        <div className='recent-page'>
            <PageNavigationBar state={{page,setPage}} count={count}/>
            <div className='container-fluid mt-3 mb-3'>
                {state[page] ?
                    <div className='row shadow-lg'>
                        {state[page].map(category => <div className='col-4' key={category._id}><CategoryPreview category={category}/></div>)}
                    </div> : null}
                <PageNavigationBar state={{page,setPage}} count={count}/>
            </div>
        </div>
    );
};

export default CategoryListPage;