import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import React,{useEffect} from 'react';
import Link from 'next/link';
const AdminIndex = () =>{
    const rel = () =>{
        if(localStorage.getItem('executed')!=undefined){
            localStorage.removeItem('executed')
        }
    }
    useEffect(()=>{
        rel();
    },[])
    return(
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin DashBoard</h2>
                        </div>
                        <div className="col-md-4">
                            <div className="list-group">
                                <Link href="/admin/crud/category-tag">
                                <a className="list-group-item list-group-item-action ">Create Category</a>
                                </Link>
                                <Link href="/admin/crud/category-tag">
                                <a className="list-group-item list-group-item-action">Create Tags</a>
                                </Link>
                                <Link href="/admin/crud/blog">
                                <a className="list-group-item list-group-item-action">Create Blog</a>
                                </Link>
                                <Link href="/admin/crud/blogs">
                                <a className="list-group-item list-group-item-action">Update/Delete Blog</a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-8">
                            right
                        </div>
                    </div>
                </div>
            </Admin>            
        </Layout>
    )
}

export default AdminIndex;