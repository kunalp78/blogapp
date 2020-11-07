import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{useSate} from 'react';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';


import Card from '../../components/blog/Card'
const Blog = ({ blogs, categories, tags, size }) => {
    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            // ()
            return (
                <article key={i}>
                   <Card blog={blog}/>
                </article>
            );
        });
    };
   
    return(
        
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">Programming Blogs and tutorials</h1>
                            </div>
                            <section>
                                    <p>show categories only and not tags sir is nuts</p>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                            <div className="card-columns" >
                                {showAllBlogs()}
                            </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        
    )
}
//getInitialProps can only be used on pages not in components

Blog.getInitialProps = () =>{
    return listBlogsWithCategoriesAndTags().then(data =>{
        if(data.error){
            console.log(data.error);
        }else{
            return {
                blogs: data.blogs, 
                categories: data.categories, 
                tags: data.tags, 
                size: data.size
            };
        }
    })
}

export default Blog;