import Layout from '../components/Layout';
import Router from 'next/router'
import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
const Index = () =>{
    useEffect(()=>{
         Router.push('/blogs');
    },[])
    return(

        <Layout>
            {/* <h2>Index page</h2> */}
            {/* <Link href="/signup"><a>Signup</a></Link> */}
            {/* <a href="/signin">signin</a> */}
            
        </Layout>
        
    )
}

export default Index;