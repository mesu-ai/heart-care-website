import { getAuth, createUserWithEmailAndPassword,updateProfile,onAuthStateChanged } from "firebase/auth";
import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {

   const [email,setEmail]= useState('');
   const [password,setPassword]=useState('');
   const [name,setName]=useState('');
   const [error,setError]=useState('');
   const [user,setUser]=useState({});

   const auth = getAuth();



    const handleName=(e)=>{
        setName(e.target.value);
        

    }

    const handleEmail=(e)=>{
        setEmail(e.target.value);
        

    }

    const handlePassword=(e)=>{
        setPassword(e.target.value);


    }

    const handleRegistration=(e)=>{
       console.log(name,email,password);


       newUserRegistration(email,password);
       
    
        e.preventDefault();


    }


    const newUserRegistration=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            setUser(result.user);
            setUserName();

        }).catch(error=>{
            setError(error.massage);
        })

    }

    const setUserName=()=>{
        updateProfile(auth.currentUser, {
            displayName:name
          }).then(() => {
            
          }).catch((error) => {
            setError(error);
          });

    }

    useEffect(()=>{

    onAuthStateChanged(auth,user=>{
        if(user){
            setUser(user);

            }
            
        })


    },[auth]);



    return (
        <div className="m-5">
        
        <Form onSubmit={handleRegistration} className="container text-start m-5 w-50 mx-auto border rounded-3 p-4 mt-3">
           
            <Form.Group  className="mb-3" controlId="formGrouptText">
                <Form.Label>Name</Form.Label>
                <Form.Control onBlur={handleName}  type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3"             controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-flex justify-content-center">
            <Button className="btn btn-primary px-4 fw-bold" type="submit">Register</Button>

            </div>
           
        </Form>

        <Link to='/login'>
        <button style={{backgroundColor:"#f0c14b",padding:'5px 10px',borderRadius:'5px'}} className="fw-bold m-2">Already Hava An Account ?</button>
        </Link>


        <p >--------------------or--------------------</p>

        <button className="btn btn-info  mt-4">
        <i className="fab fa-google text-danger"></i> Google Sign In
        </button>

    
       </div>
        
    );
};

export default Register;