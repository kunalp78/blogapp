import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React,{useState} from 'react';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';
import {APP_NAME,API,DOMAIN,FB_APP_ID} from '../../config';
import Card from '../../components/blog/Card';
import '../../static/css/styles.css'
const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
    
    const [limit, setState]= useState(blogsLimit);
    const [skip, setSkip]= useState(0);
    const [size, setSize]= useState(totalBlogs); 
    const [loadedBlogs, setLoadedBlogs]= useState([]); 

    const loadMore = () =>{
        const toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () =>{
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary">
                    Load more
                </button>
            )
        )
    }
   
    const showLoadedBlogs = () =>{
        return loadedBlogs.map((blog,i)=>(
            <article key={i}>
                <Card blog={blog}/>
            </article>
        ))
    }

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
    const showAllCategories = () =>{
        return categories.map((c, i)=>(
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }
    const showAllTags = () =>{
        return tags.map((t, i)=>(
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    return(
    <React.Fragment>
      <Head>
            <title>Daily News Headlines | {APP_NAME}</title>
            
            <meta 
                name="description" 
                content="Daily News headline and daily news hits of politics world people celebrity webseries movies and technology "
                />
            
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest news headline update | ${APP_NAME}`}/>
            <meta 
                property="og:description" 
                content="Daily News headline and daily news hits of politics world people celebrity webseries movies and technology  "
                />
            <meta 
                property="og:type"
                content="website"
            />
            <meta 
                property="og:url"
                content={`${DOMAIN}${router.pathname}`}
            />
            <meta 
                property="og:site_name"
                content={`${APP_NAME}`}
            />
            <meta property="og:image" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
        <Layout>
            <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 text-center">Daily News</h1>
                            </div>
                            <section>
                                    <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br/>
                                    {showAllTags()}
                                    </div>
                            </section>
                        </header>
                    </div>
                    <div className="col-md-12"></div>  {/** advertisment */ }
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-md-2"></div>  {/** advertisment */ }
                            <div className="col-md-9 offset-1">
                                <div className="card-columns" >
                                    {showAllBlogs()}
                                    {showLoadedBlogs()}
                                </div>
                            </div>
                        <div className="col-md-1"></div> {/** advertisment */}
                        </div>
                    </div>
                    <div className="container-fluid text-center">{loadMoreButton()}</div>
            </main>
                
        </Layout>
    </React.Fragment>
    )
}
//getInitialProps can only be used on pages not in components

Blogs.getInitialProps = () =>{
    let skip = 0;
    let limit = 6;
    return listBlogsWithCategoriesAndTags(skip,limit).then(data =>{
        if(data.error){
            console.log(data.error);
        }else{
            return {
                blogs: data.blogs, 
                categories: data.categories, 
                tags: data.tags, 
                totalBlogs: data.size,
                blogsLimit:limit,
                blogSkip:skip
            };
        }
    })
}

export default withRouter(Blogs);