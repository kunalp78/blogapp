import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs, query }) => {
    return (
        <React.Fragment>
        <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta name="description" content={`Daily News Analysis ${tag.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`}/>
            <meta property="og:description" content={`Daily News Analysis ${tag.name}`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}
            />
            <meta property="og:image" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/newsapp.jpg`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    {tag.name}
                                </h1>
                                <div className="row">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="card-columns" >
                                            {blogs.map((b, i) => (
                                                <div>
                                                    <Card key={i} blog={b} />
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, blogs: data.blogs, query };
        }
    });
};

export default Tag;