"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Formly
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Launching April 2025</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Build forms like
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}writing a document
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Formly is the first form builder that feels like Notion. Beautiful, unlimited, and 10x faster than Jotform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Free forever plan</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Unlimited submissions</div>
          </div>
        </div>
      </section>
    </div>
  );
}