import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{useEffect, useState} from 'react';
import { listRelated, singleBlog} from '../../actions/blog';
import {APP_NAME,API,DOMAIN,FB_APP_ID} from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';
import '../../static/css/styles.css'
const SingleBlog = ({blog, query}) =>{
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);
    console.log(related,'hello')
    //it wii run when the component mounts
    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };
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
    const showComments = () => (
        <div>
            <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
        </div>
    )
        
    return <React.Fragment>
            <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc.result}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc.result}/>
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
                            <div className="border border-dark col">ad0</div>  {/** advertisment */ }
                            <div className="container-fluid">
                                <section>
                                    <div className="display-3 col-md-12 lead mt-4">{renderHTML(blog.title)}</div>
                                    <div className="border border-dark col-md-12">ad4</div>  {/** advertisment */ }
                                    <div className='row'>
                                    <div className="border border-dark col-md-2">ad1</div>  {/** advertisment */ }
                                    <div className="col-md-8 lead mt-4">{renderHTML(blog.body)}</div>
                                    <div className="border border-dark col-md-2">ad2</div>  {/** advertisment */ }
                                    </div>
                                </section>
                            </div>
                            <section>
                            <div className="border border-dark col-md-12">ad3</div>  {/** advertisment */ }
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
                                <div className="border border-dark col-md-12">ad5</div>  {/** advertisment */ }
                                <hr/>
                                <div className="row">{showRelatedBlog()}</div>
                                <div className="border border-dark col-md-12">ad6</div>  {/** advertisment */ }
                            </div>
                            <div className="container pb-5">
                                {showComments()}
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