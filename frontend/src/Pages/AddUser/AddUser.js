import React, { useState,useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  border,
  Button,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'

import { FaCircleDot } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const AddUser = () => {
    const toast = useToast()
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [name, setName]=useState(null);
    const [admin,setAdmin]=useState(false);
    let adminEmail="admin@gmail.com";
    useEffect(()=>{
        if(Cookies.get('userEmail')){
          if(Cookies.get('userEmail')===adminEmail){
            setAdmin(Cookies.get('userEmail'));
          }
        }
      })
    async function handleAddUser(){
        if(!name && !password && !email){
            toast({
                title: 'Missing Details',
                description: "Some Details are Missing",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

       else{
        const res=await axios.post('http://localhost:8080/register/railways/user', {
            email:email,
            password:password,
            name:name,
        })
        .then((response)=>{
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
        })
        .catch(()=>{
            toast({
                title: 'Error 404',
                description: "Internal Server Error",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })
       }
    }
    
    console.log(window.location.href);
  return (
    <>
      <div className="mt-[2%] flex justify-center items-center w-[100%] gap-10">
        <div className="flex flex-col justify-center items-center  gap-10">
          <div>
            <Card variant="filled" sx={{ boxShadow: "0px 0px 0px 10px white" }}>
              <CardBody>
                <CardHeader>
                  <Heading size="md">
                    <div className="font-ubuntu">Enter Email</div>
                  </Heading>
                </CardHeader>
                <Text>
                  <div className="flex flex-row">
                    <div className="source flex justify-center items-center">
                      <InputGroup
                        sx={{
                          borderRadius: "30px",
                        }}
                      >
                        <InputLeftElement pointerEvents="none">
                          <FaCircleDot fill="green" />
                        </InputLeftElement>

                        <Input
                          className="card"
                          variant="filled"
                          sx={{
                            border: "2px solid grey",
                            borderRadius: "10px",
                            padding: "20px",
                            paddingLeft: "50px",
                          }}
                          type="text"
                          w={400}
                          placeholder=""
                          onChange={(e)=>setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </Text>
                <CardHeader>
                  <Heading size="md">
                    <div className="font-ubuntu">Enter Password</div>
                  </Heading>
                </CardHeader>
                <Text>
                  <div className="flex flex-row">
                    <div className="source flex justify-center items-center">
                      <InputGroup
                        sx={{
                          borderRadius: "30px",
                        }}
                      >
                        <InputLeftElement pointerEvents="none">
                          <FaCircleDot fill="orange" />
                        </InputLeftElement>

                        <Input
                          className="card font-ubuntu"
                          variant="filled"
                          sx={{
                            border: "2px solid grey",
                            borderRadius: "10px",
                            padding: "20px",
                            paddingLeft: "50px",
                          }}
                          type="text"
                          w={400}
                          placeholder=""
                          onChange={(e)=>setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </Text>
                <CardHeader>
                  <Heading size="md">
                    <div className="font-ubuntu">Enter Name</div>
                  </Heading>
                </CardHeader>
                <Text>
                  <div className="flex flex-row">
                    <div className="source flex justify-center items-center">
                      <InputGroup
                        sx={{
                          borderRadius: "30px",
                        }}
                      >
                        <InputLeftElement pointerEvents="none">
                          <FaCircleDot fill="red" />
                        </InputLeftElement>

                        <Input
                          className="card"
                          variant="filled"
                          sx={{
                            border: "2px solid grey",
                            borderRadius: "10px",
                            padding: "20px",
                            paddingLeft: "50px",
                          }}
                          type="text"
                          w={400}
                          placeholder=""
                          onChange={(e)=>setName(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </Text>
                
              </CardBody>
            </Card>
          </div>
          <div className="button">
            <button onClick={handleAddUser}
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm gap-2">
                Add User
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
