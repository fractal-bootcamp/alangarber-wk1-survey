import React from "react";
import apiClient from "client";
import { Link, useLoaderData } from "react-router";

export function meta() {
  return [
    { title: "Surveys" },
    { name: "description", content: "View and take surveys" },
  ];
}

export async function loader() {
  const response = await apiClient.surveys.get();
  if (!response.data) {
    throw new Error("Failed to load surveys");
  }
  return response.data;
}

export default function SurveyList() {
  const surveys = useLoaderData<typeof loader>();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Surveys</h1>
      <div className="space-y-4">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="p-4 border border-gray-300 dark:border-gray-700 rounded"
          >
            <h2 className="text-xl font-semibold mb-2 mt-2 text-center">
              {survey.question}
            </h2>
            <div className="space-x-4 space-y-4 text-center">
              <Link
                to={`/surveys/${survey.id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Take Survey
              </Link>
              <Link
                to={`/surveys/${survey.id}/results`}
                className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/surveys/new"
        className="mt-8 ml-2 flex justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Create New Survey
      </Link>
    </main>
  );
}
