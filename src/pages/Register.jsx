import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Github,
    Chrome,
    ShieldPlus,
    ArrowRight,
} from "lucide-react";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';

// Validation schema
const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Enter a valid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm your password"),
        terms: z.boolean().refine((v) => v === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1100));
        toast.success("Account created successfully! Welcome aboard.");
        setIsSubmitting(false);
    };

    return (
        <Layout>
            <div className="relative min-h-screen bg-gray-50">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
                </div>

                <section className="relative">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
                        {/* Left text section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                                <ShieldPlus className="h-4 w-4 text-lime-600" />
                                Join our community today
                            </div>
                            <h1 className="font-inter mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                                Create your free account
                            </h1>
                            <p className="max-w-xl text-lg text-gray-600">
                                Start your journey with us and unlock access to premium courses,
                                personalized learning, and a supportive developer community.
                            </p>
                        </motion.div>

                        {/* Form card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100">
                                        <User className="h-5 w-5 text-lime-700" />
                                    </div>
                                    <div>
                                        <h2 className="font-inter text-2xl font-bold text-gray-900">Sign up</h2>
                                        <p className="text-sm text-gray-600">Create your account</p>
                                    </div>
                                </div>

                                {/* Social logins */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => toast.info("Google Sign-Up coming soon")}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                    >
                                        <Chrome className="h-4 w-4" />
                                        Sign up with Google
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toast.info("GitHub Sign-Up coming soon")}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                    >
                                        <Github className="h-4 w-4" />
                                        Sign up with GitHub
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-gray-200" />
                                    <span className="text-xs uppercase tracking-wider text-gray-500">or</span>
                                    <div className="h-px flex-1 bg-gray-200" />
                                </div>

                                {/* Register form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <User className="h-4 w-4 text-gray-400" />
                      </span>
                                            <input
                                                {...register("name")}
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                        </div>
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </span>
                                            <input
                                                {...register("email")}
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </span>
                                            <input
                                                {...register("password")}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((s) => !s)}
                                                className="absolute inset-y-0 right-3 inline-flex items-center justify-center"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </span>
                                            <input
                                                {...register("confirmPassword")}
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((s) => !s)}
                                                className="absolute inset-y-0 right-3 inline-flex items-center justify-center"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                    </div>

                                    {/* Terms */}
                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            {...register("terms")}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                                        />
                                        <span className="text-sm text-gray-700">
                      I agree to the {" "}
                                            <a href="#" className="font-semibold text-lime-700 hover:underline">
                        Terms and Conditions
                      </a>
                    </span>
                                    </div>
                                    {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowRight className="h-4 w-4" />
                                                Sign up
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        to="/sign-in"
                                        className="font-semibold text-lime-700 hover:underline"
                                    >
                                        Sign in instead
                                    </Link>
                                </p>
                            </div>
                            <div className="absolute -inset-1 -z-0 rounded-3xl bg-gradient-to-br from-lime-400/20 via-pink-400/10 to-transparent blur-2xl" />
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
