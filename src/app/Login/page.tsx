"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import  {useForm}  from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"
import { LoginSchema, LoginSchemaType } from './../../Schema/Login.schema';
import {signIn} from "next-auth/react"
import Link from "next/link";
export default function Login() {
  
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

async function handleLogin (values : LoginSchemaType) {

 const response= await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: "/"
  }) 
  if( response?.ok){
     toast.success("You Logged In Successfully ✔", { position: "top-center", duration: 3000 });
    window.location.href="/"
  }else{
    toast.error(response?.error, { position: "top-center", duration: 3000 });
  }





  }

  return (
   <>
    
      <div className="w-1/2 mx-auto my-12">
      <h1 className="text-3xl font-bold text-center my-4">Login Now</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin) } className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <Link href={`/ForgotPassword`} className="text-sm text-gray-600 hover:underline cursor-pointer flex justify-end">Forget Password?</Link>
          <div className="flex justify-center w-1/2 mx-auto ">
              <div className="relative inline-flex items-center justify-center gap-4 group my-4 mx-auto ">
              <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button
               type="submit"
                className="group relative cursor-pointer inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="login"
              >
                Login now
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  height="10"
                  width="10"
                  fill="none"
                  className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                >
                  <path
                    d="M0 5h7"
                    className="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    className="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </button>
                 </div>
           </div>
        </form>
        </Form>
      </div> 
    </>
  );
}

