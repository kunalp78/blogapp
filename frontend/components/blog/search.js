import Link from 'next/link';
import renderHTML from 'react-render-html';
import React,{ useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown';
import '../../static/css/styles.css';
const Search = () => {
    
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const searchedBlogs = (results = []) => {
        return (
            <ul className="border border-dark results bg-white" >
                {message && <p className="pt-4 text-muted font-italic pb-1 pl-3 " style={{backgroundColor:'white'}}>{message}</p>}

                {results.map((blog, i) => {
                    return (
                        
                        <li className="result pt-2 pb-1 pl-3" key={i} >
                            <span href={`/blogs/${blog.slug}`}>
                                {blog.title}
                            </span>
                        </li>
                        
                    );
                })}
            </ul>
        );
    };

    const searchForm = () => (
        <span >
                    <input type="search" className="form-control mr-sm-2" placeholder="Search blogs" onChange={handleChange} />

                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
                        Search
                    </button>
        </span>
    );
    
    return (
        <span>
        <form className='form-inline' onSubmit={searchSubmit}>
            {searchForm()}
           
        </form>
        {searched && <div className="pos">{searchedBlogs(results)}</div>}
        </span>
    );
};

export default Search;