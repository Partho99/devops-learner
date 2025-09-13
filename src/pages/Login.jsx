import React, {useState} from "react";
import {motion} from "framer-motion";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Github,
    Chrome,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import {loginWithOidc} from "../hooks/useOidcLogin.js";

// Validation schema
const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: "", password: "", remember: true},
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1100));
        toast.success("Welcome back! You're now signed in.");
        setIsSubmitting(false);
    };

    return (
        <Layout>
            <div className="relative min-h-screen bg-gray-50">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl"/>
                    <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"/>
                </div>

                <section className="relative">
                    <div
                        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
                        {/* Brand / Value prop */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="flex flex-col justify-center"
                        >
                            <div
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                                <ShieldCheck className="h-4 w-4 text-lime-600"/>
                                Secure by design — privacy first
                            </div>

                            <h1 className="font-inter mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                                Welcome back
                            </h1>
                            <p className="max-w-xl text-lg text-gray-600">
                                Sign in to continue learning, track your progress, and access
                                premium content tailored to your goals.
                            </p>

                            {/* Social proof */}
                            <div className="mt-8 flex items-center gap-6">
                                <div className="flex -space-x-2">
                                    {/* Avatar group (placeholders) */}
                                    {[0, 1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-lime-400 to-blue-400"
                                            aria-hidden
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Loved by <span className="font-semibold text-gray-900">10k+</span> learners
                                </p>
                            </div>
                        </motion.div>

                        {/* Card */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.1}}
                            className="relative"
                        >
                            <div
                                className="relative z-10 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100">
                                        <Lock className="h-5 w-5 text-lime-700"/>
                                    </div>
                                    <div>
                                        <h2 className="font-inter text-2xl font-bold text-gray-900">Sign in</h2>
                                        <p className="text-sm text-gray-600">Use your account credentials</p>
                                    </div>
                                </div>

                                {/* Social logins */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => loginWithOidc()}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
                                    >
                                        <Chrome className="h-4 w-4" />
                                        Continue with Google
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toast.info("GitHub Sign-In coming soon")}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                    >
                                        <Github className="h-4 w-4"/>
                                        Continue with GitHub
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-gray-200"/>
                                    <span className="text-xs uppercase tracking-wider text-gray-500">or</span>
                                    <div className="h-px flex-1 bg-gray-200"/>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <Mail className="h-4 w-4 text-gray-400"/>
                      </span>
                                            <input
                                                {...register("email")}
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password"
                                               className="mb-2 block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center">
                        <Lock className="h-4 w-4 text-gray-400"/>
                      </span>
                                            <input
                                                {...register("password")}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((s) => !s)}
                                                className="absolute inset-y-0 right-3 inline-flex items-center justify-center"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-500"/>
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-500"/>
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {/* Options */}
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                {...register("remember")}
                                                className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                                                defaultChecked
                                            />
                                            <span className="text-sm text-gray-700">Remember me</span>
                                        </label>
                                        <a href="#" className="text-sm font-semibold text-lime-700 hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                        aria-busy={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                                Signing in...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowRight className="h-4 w-4"/>
                                                Sign in
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Footer links */}
                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Don’t have an account?{" "}
                                    <Link
                                        to="/sign-up"
                                        className="font-semibold text-lime-700 hover:underline"
                                    >
                                        Create one for free
                                    </Link>
                                </p>
                            </div>

                            {/* Glow ring */}
                            <div
                                className="absolute -inset-1 -z-0 rounded-3xl bg-gradient-to-br from-lime-400/20 via-blue-400/10 to-transparent blur-2xl"/>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
