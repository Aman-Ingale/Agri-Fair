//signup form for client 
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";
import { Riple } from "react-loading-indicators";
//schema for zod
const formSchema = z.object({
  firstname: z.string().trim().min(2, { message: "First name must be at least 2 characters." }),
  lastname: z.string().trim().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["farmer", "buyer"], { required_error: "Please select role" }),
  address: z.string().trim().min(10, { message: "Address must be at least 10 characters." }),
  phone_number: z.string().regex(/^[0-9]{10}$/, { message: "Invalid phone number" }),
});

export default function SignUpClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: undefined,
      address: "",
      phone_number: "",
    },
  });
  //POST called when clicked submit
  async function onSubmit(values) {
    setIsLoading(true)
    console.log("Submitting:", values);
        const r = await fetch("/api/signup/client",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    if (result.success) {
      router.push("/login/client");
    } else {
      setIsLoading(false)
      console.error("Signup failed:", result.message);
    }
  }

  if(isLoading){
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <Riple color="#16a34a" size="medium" text="" textColor="" />      </div>
    )
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 px-4 py-8">
      <Card className="w-full max-w-2xl p-8 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-800 dark:text-green-400">SignUp</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* First Name */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem value="farmer" id="r1" />
                          <FormLabel htmlFor="r1" className="text-gray-600 dark:text-gray-400 cursor-pointer">Farmer</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem value="buyer" id="r2" />
                          <FormLabel htmlFor="r2" className="text-gray-600 dark:text-gray-400 cursor-pointer">Buyer</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" maxLength={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter full address" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600 text-lg transition-colors">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Already have an account?</span>
                            <Link href="/login" className="ml-1 text-sm text-green-600 dark:text-green-400 hover:underline">Login</Link>
                          </div>
        </CardContent>
      </Card>
    </div>
  );
}
