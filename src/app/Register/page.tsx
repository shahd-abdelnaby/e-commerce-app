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
import { RegisterSchema, RegisterSchemaType } from "@/Schema/Register.schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  async function handleRegister(values: RegisterSchemaType) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      if (response.data.message === "success") {
        toast.success("You Registered Successfully", {
          position: "top-center",
          duration: 3000,
        });
        router.push("/Login");
        form.reset();
      }
    } catch (err: unknown) {
  if (err && typeof err === 'object' && 'response' in err) {
    const error = err as { response: { data: { message: string } } };
    toast.error(error.response.data.message, {
      position: "top-center",
      duration: 3000,
    });
  } else {
    toast.error("An error occurred", {
      position: "top-center",
      duration: 3000,
    });
  }
}
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl font-bold text-center my-4">Register Now</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex justify-center w-1/2 mx-auto ">
              <div className="relative inline-flex items-center justify-center gap-4 group my-10 mx-auto ">
              <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button
               type="submit"
                className="group relative cursor-pointer inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="Register"
              >
                Register now
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
