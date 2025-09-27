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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { checkOutSchemaType, checkOutSchema } from "@/Schema/checkout.schema";
import CashCheckOut from "@/cashActions/Cash.action";

export default function CashCheckout() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const form = useForm<checkOutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkOutSchema),
  });

  async function handleCashCheckOut(values: checkOutSchemaType) {
     const res = await CashCheckOut(id, values);
        console.log(res);
    if (res.status === "success") {
      toast.success("order placed successfully", {
               duration: 4000,
               position: "top-center",
             });
      router.push("/allorders");
    }  
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl font-bold text-center my-4">Check out now</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCashCheckOut)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative inline-flex items-center justify-center gap-4 group my-10 mx-auto">
              <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button
               onSubmit={form.handleSubmit(handleCashCheckOut)}
               type="submit"
                className="group relative cursor-pointer inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="payment"
              >
                pay now
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
          </form>
        </Form>
      </div>
    </>
  );
}
