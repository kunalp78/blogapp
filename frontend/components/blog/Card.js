import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';

const Card = ({blog})=>{
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
    
    return (
    
        <div className="card text-center border-primary mb-3 pb-3"  >
        {/* style={{width: "50rem"}}>        img: 245X160 or 245X260*/}
             <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img
                            className="card-img-top" 
                            src={`${API}/blog/photo/${blog.slug}`} 
                            style={{height:'150px',width:'100%',display:'block'}} 
                            alt={blog.title}
                        />
                    </a>
                </Link>
            
            <div className="card-body">
                
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="card-title">{blog.title.toUpperCase()}</h2>
                    </a>
                </Link>
                
                <p className="card-text ">{renderHTML(blog.excerpt)}</p>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="btn btn-primary pt-2">Read more</a>
                    </Link>
            </div>
            
            <div className="pb-2">
                
                {showBlogCategories(blog)}
                {showBlogTags(blog)}

            </div>
            <div className="card-footer bg-transparent border-primary">
                <small className="card-mark">
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </small>
            </div>
        </div>
   
    )
}

export default Card;