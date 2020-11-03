import Router from 'next/router';
import React, {useState, useEffect}from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth';


const SigninComponent = () => {
    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        message: '',
        showForm:true
    })

    const { email, password, error, loading, message, showForm} = values ;

    useEffect(()=>{
        isAuth() && Router.push('/');
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.table({name, email, password, error, loading, message, showForm});
        setValues({...values, loading: true, error: false});
        const user = { email, password}
        signin(user).then(data=>{
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }else{
                    //save user token into cookie
                    //save userinfo to localStorage
                    //authenticate user
                    authenticate(data, ()=>{
                        if(isAuth() && isAuth().role === 1){
                            Router.push('/admin');
                        }else{
                            Router.push('/user')
                        }
                    })
                }
            })
    }
    const handleChange = name => e =>{
        setValues({...values, error:false, [name]: e.target.value})
    }
    const showLoading = () => loading ? <div className="alert alert-info">Loading...</div> : '';
    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => message ? <div className="alert alert-info">{message}</div> : '';
    const signinForm = ()=>{
        return (
        <form onSubmit={handleSubmit}>
           
            <div className="form-group">
                <input 
                value={email}
                onChange={handleChange('email')} 
                type="email" 
                className="form-control" 
                placeholder="Type Your email"/>
            </div>
            <div className="form-group">
                <input 
                value={password}
                onChange={handleChange('password')}
                type="password" 
                className="form-control" 
                placeholder="Type Your password"/>
            </div>
            <div>
                <button className="button buttom-primary">SignIn</button>
            </div>
            
        </form>
        )
    }
    return (    
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
};

export default SigninComponent;