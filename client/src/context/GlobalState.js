import React, {createContext, useState} from "react";
import axios from 'axios';

export const GlobalContext = createContext({});

const GlobalState = (props) => {
    const apiUrl = 'http://localhost:4000/api/v1';

    const [recentPosts, setRecentPosts] = useState({});
    const [recentPostCount, setRecentPostCount] = useState(null);

    const [trendingPosts, setTrendingPosts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [categoryCount, setCategoryCount] = useState(null);

    const [categoryPosts, setCategoryPosts] = useState({});
    const [categoryPostCount, setCategoryPostCount] = useState(null);

    const [tagPosts, setTagPosts] = useState({});
    const [tagPostCount, setTagPostCount] = useState(null);

    const fetchRecentPosts = async (page) => {
        if (!page) page = 0;
        if (!recentPosts[page]) {
            try {
                const response = await axios.get(`${apiUrl}/posts/get-recent/${page}`);
                setRecentPosts({...recentPosts, [page]: response.data.posts});
                setRecentPostCount(response.data.count);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const fetchTrendingPosts = async () => {
        if (trendingPosts.length === 0) {

            try {
                const response = await axios.get(`${apiUrl}/posts/get-trending`);
                setTrendingPosts(response.data);
            } catch (e) {
                console.log(e)
            }
        }
    };

    const fetchCategories = async (page) => {
        if (!page) page = 0;
        if (categories.length === 0) {
            try {
                const response = await axios.get(`${apiUrl}/categories/get-all/${page}`);
                setCategories({...categories, [page]: response.data.categories});
                setCategoryCount(response.data.count)
            } catch (e) {
                console.log(e)
            }
        }
    };

    const fetchCategoryPosts = async (categoryName, page) => {
        if (!page) page = 0;
        if (!categoryPosts[page]) {
            try {
                const response = await axios.get(`${apiUrl}/posts/get-by-category/${categoryName}/${page}`);
                const postsObject = {...categoryPosts};

                if (!postsObject[categoryName]) postsObject[categoryName] = {};
                postsObject[categoryName][page] = response.data.posts;

                setCategoryPosts(postsObject);
                setCategoryPostCount(response.data.count);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const fetchTagPosts =async (tagName , page) => {
      if(!page) page =0;
      if(!tagPosts[page]) {
          try {
              const response = await axios.get(`${apiUrl}/posts/get-by-tag/${tagName}/${page}`);
              const postsObject = {...tagPosts};

              if (!postsObject[tagName]) postsObject[tagName] = {};
              postsObject[tagName][page] = response.data.posts;

              setTagPosts(postsObject);
              setTagPostCount(response.data.count);
              console.log(postsObject);
          } catch (e) {
              console.log(e);
          }
      }
    };

    return (
        <GlobalContext.Provider
            value={{
                recentPosts: {state: recentPosts, fetch: fetchRecentPosts, count: recentPostCount},
                trendingPosts: {state: trendingPosts, fetch: fetchTrendingPosts},
                categoryPosts: {state: categoryPosts, fetch: fetchCategoryPosts, count: categoryPostCount},
                categories: {state: categories, fetch: fetchCategories, count: categoryCount},
                tagPosts: {state: tagPosts, fetch: fetchTagPosts, count: tagPostCount},
            }}
            children={props.children}/>
    )
};

export default GlobalState;