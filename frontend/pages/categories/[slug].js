import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { singleCatagory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {
    return (
        <React.Fragment>
        <Head>
        {console.log(category)}
            <title>{category.name} | {APP_NAME}</title>
            <meta name="description" content={`Daily News Analysis ${category.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`}/>
            <meta property="og:description" content={`Daily News Analysis ${category.name}`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}
            />
            <meta property="og:site_name" content={`${APP_NAME}`}
            />
            <meta property="og:image" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
            <Layout>
                <main>
                <div className="col-md-12"></div>  {/** advertisment */ }

                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    {category.name}
                                </h1>
                    <div className="col-md-12"></div>  {/** advertisment */ }
                                <div className="container-fluid">
                                <div className="row">
                    <div className="col-md-2"></div>  {/** advertisment */ }

                                    <div className="col-md-9">
                                        <div className="card-columns" >
                                            {blogs.map((b, i) => (
                                                <div>
                                                    <Card key={i} blog={b} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                    <div className="col-md-1"></div>  {/** advertisment */ }
                                </div>
                    <div className="col-md-12"></div>  {/** advertisment */ }
                            </div>
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = ({ query }) => {
    return singleCatagory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { category: data.category, blogs: data.blogs, query };
        }
    });
};

export default Category;