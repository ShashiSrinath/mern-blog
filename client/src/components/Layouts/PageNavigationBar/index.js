import React, {useState, useEffect} from 'react';
import './pageNavigationBar.scss';
import ButtonPrimary from "../Button/ButtonPrimary";

const PageNavigationBar = ({state, count}) => {
    const [navPages, setNavPages] = useState([]);

    useEffect(() => {
        let page = 1;
        const pages = [];
        for (let i = 0; i < count; i += 12) {
            pages.push(page++);
        }
        setNavPages(pages);
    }, [count]);

    return (
        <nav className='mt-3' aria-label="Page navigation">
            <ul className="pagination justify-content-center page-navigation-bar">
                <li className={`page-item ${state.page === 0 ? 'disabled' : null}`}>
                    <ButtonPrimary className="page-link btn-navigate"
                            onClick={() => state.page > 0 ? state.setPage(state.page - 1) : null}>Previous
                    </ButtonPrimary>
                </li>
                <div className='d-flex ml-2 mr-2'>
                    <select className='form-control select-navigation' onChange={(e) => state.setPage(e.target.value -1)} value={state.page+1}>
                        {navPages.map(page => (
                            <option key={page} value={page}>{page}</option>))}
                    </select>
                </div>
                <li className={`page-item ${state.page + 1 >= count / 12 ? 'disabled' : null}`}>
                    <ButtonPrimary className="page-link btn-navigate" onClick={() => state.setPage(state.page + 1)}>Next</ButtonPrimary>
                </li>
            </ul>
        </nav>
    );
};

export default PageNavigationBar;