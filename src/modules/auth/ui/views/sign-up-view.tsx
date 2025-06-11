"use client"

import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlertIcon, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {FaGithub, FaGoogle} from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"



const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(""),
    password: z.string().min(6, { message: "Password is required" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const SignUpView = () => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/"
            }, {
            onSuccess: () => {
                setPending(false);
                router.push("/");
            },
            onError: ({ error }) => {
                setPending(false);
                setError(error.message);
            }
        }
        )

    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-semibold">
                                        Let&apos;s Get Started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create an Account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your Name"
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your password"
                                                            {...field}
                                                            value={field.value || ""}
                                                        />
                                                        <button
                                                            type="button"
                                                            tabIndex={-1}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                            onClick={() => setShowPassword((v) => !v)}
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                        >
                                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your password"
                                                            {...field}
                                                            value={field.value || ""}
                                                        />
                                                        <button
                                                            type="button"
                                                            tabIndex={-1}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                            onClick={() => setShowPassword((v) => !v)}
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                        >
                                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none ">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle className="text-sm">
                                            {error}
                                        </AlertTitle>
                                    </Alert>
                                )}
                                <Button disabled={pending} type="submit" className="w-full">
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relativez-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button disabled={pending} onClick={() => {
                                        authClient.signIn.social({
                                            provider: "google"
                                        })
                                    }} variant="outline" type="button" className="w-full">
                                        <FaGoogle />
                                    </Button>
                                    <Button disabled={pending} onClick={() => {
                                        authClient.signIn.social({
                                            provider: "github"
                                        })
                                    }} variant="outline" type="button" className="w-full">
                                        <FaGithub />
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="text-primary underline underline-offset-4">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-600 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <Image src="/logo.svg" alt="Image" height={92} width={92} />
                        <p className="text-2xl font-semibold text-white">
                            Meet.AI
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking &apos;Sign In&apos;, you agree to our<a href="/terms">Termas of service</a> and <a href="/privacy">Privacy Policy</a>.
            </div>
        </div>
    )
}