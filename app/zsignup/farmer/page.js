//signup form for provider
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
  gender: z.enum(["male", "female"]),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  location: z.string(),
  address: z.string(),
  profession: z.enum(["carpenter", "plumber", "electrician","babysitter","housemaid","watchman"]),
  experience: z.coerce.number().min(0, { message: "Experience must be a non-negative number" }),
  description: z.string().max(500).optional(),
});

export default function SignUpProvider() {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      gender: "male",
      phone: "",
      location: "",
      address: "",
      profession: "carpenter",
      experience: 0,
      description: "",
    },
  });
  //POST called when clicked submit button
  async function onSubmit(values) {
    setIsLoading(true)
    console.log("Submitting:", values);
       const r = await fetch("/api/signup/provider",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    //if verified succesfully then redirecting to login page
    if (result.success) {
      router.push("/login/provider");
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
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <Card className="w-full max-w-4xl p-6 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30 space-y-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-green-800 dark:text-green-400">Provider SignUp</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

              {/* Personal Details Section */}
              <div className="space-y-6 border-b pb-6 border-green-200 dark:border-green-800/30">
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-400">Personal Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
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
                          <Input placeholder="Enter last name" {...field} />
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
                          <Input type="email" placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Gender</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-4">
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <FormLabel htmlFor="male" className="font-normal text-gray-600 dark:text-gray-400 cursor-pointer">Male</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <FormLabel htmlFor="female" className="font-normal text-gray-600 dark:text-gray-400 cursor-pointer">Female</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-400">Additional Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city or town" {...field} />
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
                          <Textarea placeholder="Full address" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Profession */}
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Profession</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="carpenter">Carpenter</SelectItem>
                            <SelectItem value="plumber">Plumber</SelectItem>
                            <SelectItem value="electrician">Electrician</SelectItem>
                            <SelectItem value="housemaid">Housemaid</SelectItem>
                            <SelectItem value="babysitter">Babysitter</SelectItem>
                            <SelectItem value="watchman">Watchman</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* Experience */}
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Experience (in years)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your work experience..." rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">Sign Up</Button>

                <div className="text-center mt-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Already have an account?</span>
                  <Link href="/login" className="ml-1 text-sm text-green-600 dark:text-green-400 hover:underline">Login</Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
