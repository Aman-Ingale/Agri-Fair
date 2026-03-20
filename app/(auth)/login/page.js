//login form for client
"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Riple, ThreeDot } from "react-loading-indicators";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
});
const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function LogInClient() {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
//POST request for verifying client
  async function onSubmit(values) {
    setIsLoading(true)
    console.log("Submitting:", values);
        const r = await fetch("/api/auth/login",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    if (result.success) {
      console.log(result.data)
        toast.success('Login Succesfull', {
          description: result.message,
        })
      fetch(`${url}/api/cookie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          role:result.data.role,
          id : result.data._id
        })
      })

        .then(response => {
          console.log(response)
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.status);
          }
          return response.json(); // or response.text()
        })
        .catch(error => {
          console.error("Fetch error:", error);

        });
    
      // localStorage.setItem("id",result.data.toString());
      if(result.data.role=='buyer'){
        router.push("/listings");
      }
      else{
        router.push("/dashboard");
      }
    } else {
      setIsLoading(false)
            toast.error('Invalid Credential', {
              description: result.message,
            })
      console.log("Login failed:", result.message);
    }
  }
  //     async function onSubmit(values) {
  //       const r = await fetch("/api/login/client",{
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(values),
  //   });
  //   const result = await r.json();
  //   console.log(result)
  //   if (result.success) {
  //     router.push("/client/providers");
  //   } else {
  //     console.error("Login failed:", result.message);
  //   }
  // }
  if(isLoading){
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <Riple color="#16a34a" size="medium" text="" textColor="" />      </div>
    )
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <Card className="w-full max-w-lg p-6 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-800 dark:text-green-400">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">Login</Button>
            </form>
          </Form>
          <div className="flex justify-center mt-4">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account?&nbsp;</span>
            <Link href="/signup" className="text-green-600 dark:text-green-400 hover:underline">
              SignUp
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
