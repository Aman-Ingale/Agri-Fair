//page for choosing logging in as client or provider
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { User, Wrench, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  role: z.enum(["buyer", "farmer"], { message: "Please select a role." }),
});

export default function LogInProvider() {
  const [selectedRole, setSelectedRole] = useState("Farmer");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "farmer",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const pushUrl = "/login/" + values.role;
    router.push(pushUrl);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-6 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-400">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose your role to continue to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            value: "buyer",
                            label: "Buyer",
                            icon: User,
                            description: "",
                          },
                          {
                            value: "farmer",
                            label: "Farmer",
                            icon: Wrench,
                            description: "",
                          },
                        ].map((role) => (
                          <motion.button
                            key={role.value}
                            type="button"
                            onClick={() => {
                              setSelectedRole(role.value);
                              field.onChange(role.value);
                            }}
                            className={cn(
                              "relative flex flex-col items-center justify-center rounded-lg border p-4 transition-all hover:border-green-500",
                              selectedRole === role.value
                                ? "border-green-600 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-200 dark:ring-green-800/30"
                                : "border-green-200 dark:border-green-800/30"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {selectedRole === role.value && (
                              <div className="absolute -right-2 -top-2 rounded-full bg-green-600 dark:bg-green-700 p-1">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                            <role.icon
                              className={cn(
                                "mb-2 h-6 w-6",
                                selectedRole === role.value
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-500 dark:text-gray-400"
                              )}
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-300">{role.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {role.description}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="font-medium text-green-600 dark:text-green-400 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}



         
