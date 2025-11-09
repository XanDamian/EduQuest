"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Signing in...");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    toast.dismiss(toastId);

    if (result?.error) {
      toast.error("Invalid email or password. Please try again.");
    } else if (result?.ok) {
      toast.success("Signed in successfully!");
      // On successful login, redirect to the homepage for now.
      // We can change this to a dashboard later.
      router.push("/");
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen py-20">
      <div className="bg-banner-image absolute w-full h-full top-0 blur-390"></div>
      <div className="container relative z-10">
        <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white">
            Sign In to Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;