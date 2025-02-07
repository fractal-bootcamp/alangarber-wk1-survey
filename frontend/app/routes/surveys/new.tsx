import React from "react";
import type { Route } from "./+types/new";
import apiClient from "client";
import { Link, redirect } from "react-router";

export function meta() {
  return [
    { title: "Create New Survey" },
    { name: "description", content: "Create a new survey" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const question = formData.get("question");

  if (typeof question !== "string") {
    throw new Error("Question must be provided");
  }

  const response = await apiClient.surveys.post({
    question,
  });

  if (!response.data?.success) {
    throw new Error("Failed to create survey");
  }

  return redirect(`/surveys`);
}

export default function NewSurvey() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Survey</h1>
      <div className="space-y-4">
        <form method="post" className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium mb-2"
            >
              Survey Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              required
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Enter your survey question..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Create Survey
          </button>
        </form>
        <Link
          to="/surveys"
          className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
        >
          Back to Surveys
        </Link>
      </div>
    </main>
  );
}
