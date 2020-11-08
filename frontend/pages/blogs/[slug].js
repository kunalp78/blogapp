import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{useState} from 'react';
import {singleBlog} from '../../actions/blog';
import {APP_NAME,API,DOMAIN,FB_APP_ID} from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

const SingleBlog = ({blog, query}) =>{
    
    const showBlogCategories = blog =>
        blog.categories.map((c,i)=>(
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    
    const showBlogTags = blog =>
        blog.tags.map((t,i)=>(
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
        
    return <React.Fragment>
            <Head>
            <title>{blog.title} | {APP_NAME}</title>
            
            <meta name="description" content={blog.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}
            />
            <meta property="og:site_name" content={`${APP_NAME}`}
            />
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
             <Layout> 
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className='row' style={{marginTop:'-30px'}}>
                                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image"/>
                                </div>
                            </section>
                            <div className="container">
                                <section>
                                    <div className="display-4 col-md-12 lead mt-4">{renderHTML(blog.title)}</div>
                                    <div className="col-md-12 lead mt-4">{renderHTML(blog.body)}</div>
                                </section>
                            </div>
                            <section>
                                <p className="lead mt-3 mark">
                                Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                                </p>
                                <div className="pb-2 text-center">
                
                                    {showBlogCategories(blog)}
                                    <br/>
                                    {showBlogTags(blog)}
                                </div>
                            </section>
                            <div className="container pb-5">
                                <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                                <hr/>
                                <p>show related blogs</p>
                            </div>
                            <div className="container pb-5">
                                <p>comments</p>
                            </div>
                        </div>
                    </article>
                </main>
            </Layout>  
    </React.Fragment>
}

SingleBlog.getInitialProps = ({ query }) =>{
    return singleBlog(query.slug).then(data =>{
        if(data.error){
            console.log(data.error);
        }else{
            return { blog: data, query };
        }
    })
}

export default SingleBlog;