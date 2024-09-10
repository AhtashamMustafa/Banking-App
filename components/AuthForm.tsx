"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authformSchema } from "@/lib/utils";
import { z } from "zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();
  const formSchema = authformSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      // Signup with appwrite & create plaid token

      if (type === "sign-up") {
        // const newUser = await SignUp(data)
        // setUser(newUser)
        // const userData = {
        //     fristName: data.firstName,
        //     lastName: data.lastName,
        //     address: data.address,
        //     city: data.city,
        //     state: data.state,
        //     postalCode: data.postalCode,
        //     dateOfBirth: data.dateOfBirth,
        //     cnic: data.cnic,
        //     email: data.email,
        //     password: data.password
        // }
      }
      if (type === "sign-in") {
    //     const response = await SignIn({
    //       email: data.email,
    //       password: data.password,
    //     });

    //     if(response) router.push('/') 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="./icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            PayPass
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* {PlaidLink} */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" ? (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: Sindh"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 75300"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="cnic"
                      label="CNIC No"
                      placeholder="Example: 42301-0000000-0"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your Email"
                  />
                  <CustomInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                </>
              ) : (
                type == "sign-in" && (
                  <>
                    <CustomInput
                      control={form.control}
                      name="email"
                      label="Email"
                      placeholder="Enter your Email"
                    />
                    <CustomInput
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                    />
                  </>
                )
              )}

              <div className="flex flex-col gap-4">
                <Button className="form-btn" disabled={isloading} type="submit">
                  {isloading ? (
                    <>
                      <Loader size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type == "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type == "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
            </p>
            <Link
              className="form-link"
              href={type == "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type == "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
