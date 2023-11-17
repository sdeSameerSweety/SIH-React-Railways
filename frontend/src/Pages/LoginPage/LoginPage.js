import React, { useState } from "react";
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
  Toast,
} from "@chakra-ui/react";
import { FaCircleDot } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);

    async function handleLogin(){
        const res=await axios.post('http://localhost:8080/login/railways/user', {
            email:email,
            password:password,
        }).then((response)=>{
            Cookies.set("userEmail",email);
            window.location.reload(false);
        })
    }
    if(Cookies.get('userEmail')){
        return <Navigate to={'/'}/>
    }
  return (
    <>
      <div className="mt-[2%] flex justify-center items-center w-[100%] h-[100vh] gap-10">
        <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
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
              </CardBody>
            </Card>
          </div>
          <div className="button">
            <button onClick={handleLogin}
            className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm gap-2">
                Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
