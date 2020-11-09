import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { singleCatagory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    {category.name}
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

Category.getInitialProps = ({ query }) => {
    return singleCatagory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { category: data.category, blogs: data.blogs };
        }
    });
};

export default Category;