import React from "react";
import type { Route } from "./+types/survey";
import apiClient from "client";
import { Link, redirect, useLoaderData } from "react-router";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Survey: ${data?.question}` },
    { name: "description", content: `Survey #${data?.id}: ${data?.question}` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await apiClient.surveys({ id: params.id }).get();
  if (!response.data) {
    throw new Error("Failed to load survey");
  }
  return response.data;
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const answer = formData.get("answer");

  await apiClient.surveys({ id: params.id }).answer.post({
    answer: answer as string,
  });

  return redirect(`/surveys/${params.id}/results`);
}

export default function Survey() {
  const survey = useLoaderData<typeof loader>();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Survey: {survey.question}
      </h1>
      <div className="space-y-4">
        <form method="post" className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium mb-2">
              Your Answer
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              required
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Submit Answer
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
