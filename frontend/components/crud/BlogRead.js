import Link from 'next/link';
import React,{useState, useEffect} from 'react';
import Router from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';

import {list, removeBlog} from '../../actions/blog';

import '../../static/css/styles.css';
import moment from 'moment';

const BlogRead = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');
    useEffect(()=>{
        loadBlogs();
    },[]);

    const loadBlogs = () =>{
        list().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setBlogs(data);
            }
        })
    };
    const deleteBlog = (slug) =>{
        removeBlog(slug, token).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setMessage(data.message);
                loadBlogs();
            }
        })
    }
    const deleteConfirm = (slug) =>{
        let answer = window.confirm('Are you sure you want to delete the blog?');
        if(answer){
            deleteBlog(slug);
        }
    }
    const showAllBlogs = () =>(
        blogs.map((blog, i)=>(
            <div key={i}>
                <h3>{blog.title}</h3>
                <p className="mark">Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()} </p>
                <button className="btn btn-sm btn-danger" onClick={()=> deleteConfirm(blog.slug)} >Delete</button>
                {showUpdateButton(blog)}
            </div>  
        ))
    );
    const showUpdateButton = (blog) => {
        if(isAuth() && isAuth().role === 0){
            return (
                <Link href={`/user/crud/${blog.slug}`} >
                   <a className="btn btn-sm btn-warning ml-2">Update</a>
                </Link>
            )
        }else if(isAuth() && isAuth().role === 1){
            return (
                <Link href={`/admin/crud/${blog.slug}`} >
                    <a className="btn btn-sm btn-warning ml-2">Update</a>
                </Link>
            )
        }
    }
    return (
    <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div> }
                    {showAllBlogs()}
                </div>
            </div>
        </div>
    </React.Fragment>
)};
export default BlogRead;