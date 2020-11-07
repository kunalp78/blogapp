import Link from 'next/link';
import React,{useState, useEffect} from 'react';
import Router,{withRouter} from 'next/router';
import dynamic from 'next/dynamic';
import {getCookie, isAuth} from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import {createBlog} from '../../actions/blog';
const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false});
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({router})=>{
    const [body, setBody] = useState({});
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const {error, sizeError, success, formData, title, hidePublishButton} = values;

    const publishBlog = (e) =>{
        e.preventDefault();
        console.log('Ready to publish a blog ')
    }
    const handleChange = name => e =>{
        console.log(e.target.value)
    }
    const handleBody = e =>{
        console.log(e)
    }
    const createBlogForm = () =>{
        return(
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="class-muted">Title</label>
                    <input className="form-control" value={title} type="text" onChange={handleChange('title')}/>
                </div>
                <div className="form-group">
                    <ReactQuill 
                    modules={CreateBlog.modules}
                    formats={CreateBlog.formats}
                    value={body}
                    placeholder="Write something amazing" 
                    onChange={handleBody} />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">
                        Publish
                    </button>
                </div>
            </form>
        )
    }
    return <div>
        <h2>
            {createBlogForm()}
            
        </h2>
    </div>
}
CreateBlog.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
CreateBlog.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];
export default withRouter(CreateBlog);