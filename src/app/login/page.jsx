'use client'

import React from 'react';
import Link from 'next/link';
import {
    Card,
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";
import { IoLogoGoogle } from "react-icons/io";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const Loginpage = () => {

    const onsubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const user = Object.fromEntries(formdata.entries())
        // console.log(user)

        const { data, error } = await authClient.signIn.email({
            email: user.email, // user email address
            password: user.password, // user password -> min 8 characters by default

        });
        console.log(data)

        if (data) {
            alert("Login successfully !")
            redirect('/')
        }
        if (error) {
            alert('something went wrong')
        }
    }
    const handelgooglebtn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className='min-h-screen max-w-7xl mx-auto px-4 mt-5'>
            <Card className='border border-gray-400 p-6 w-full max-w-md'>
                <h1 className='text-2xl text-center mb-6'>
                    Login Account
                </h1>

                <Form className="flex w-full flex-col gap-4"
                    onSubmit={onsubmit}
                >
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>
                            Must be at least 6 characters with 1 uppercase, 1 lowercase and 1 number
                        </Description>
                        <FieldError />
                    </TextField>

                    <Button
                        className="bg-[#2d8a6b] text-white w-full"
                        type="submit"
                    >
                        Login
                    </Button>

                    <Link
                        href="/signup"
                        className="text-center text-base"
                    >
                        Don’t have an account?{" "}
                        <span className="text-blue-700">
                            Register
                        </span>
                    </Link>
                </Form>

                <div className="divider my-4">OR</div>

                <Button
                    onClick={handelgooglebtn}
                    variant="bordered"
                    className="w-full border border-2 border-blue-500"
                >
                    <IoLogoGoogle />
                    Login with Google
                </Button>
            </Card>
        </div>
    );
};

export default Loginpage;