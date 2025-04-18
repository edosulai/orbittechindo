"use client";

import { Button, Footer, LoadingSpinner } from "@/components";
import { useProtectedRoute, useValidImage } from "@/hooks";
import { fetchMovieById } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function MovieDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? params.id.toString() : null;
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    error,
    isLoading: queryIsLoading,
  } = useQuery({
    queryKey: ["detail-movie", id],
    queryFn: async () => {
      const result = await fetchMovieById(id!.toString());

      if (result.Response === "False") {
        throw new Error(result.Error);
      }

      return result;
    },
    enabled: !!id,
  });

  const { isAuthenticated, authIsLoading, logout } = useProtectedRoute();
  if (!authIsLoading && !isAuthenticated) {
    logout();
  }

  const isValidImage = useValidImage(data?.Poster || "");

  if (queryIsLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <p>No movie data found</p>;
  }

  const genreData = data.Genre.split(", ").map((genre) => ({
    genre,
    count: 1,
  }));
  const ratingData = data.Ratings.map((rating) => ({
    source: rating.Source,
    value: parseFloat(rating.Value),
  }));

  const handleBackClick = () => {
    setIsLoading(true);
    router.back();
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button onClick={handleBackClick} isLoading={isLoading} className="mr-auto">
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold mr-auto">{data.Title}</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          {isValidImage ? (
            <Image
              src={data.Poster}
              alt={data.Title}
              width={200}
              height={300}
              className="rounded-lg shadow-md w-full sm:w-auto"
            />
          ) : (
            <div className="w-[200px] h-[300px] flex items-center justify-center bg-gray-200 rounded-md">
              <span className="text-gray-900">Image Not Available</span>
            </div>
          )}
          <div className="space-y-2">
            <p>
              <strong>Year:</strong> {data.Year}
            </p>
            <p>
              <strong>Genre:</strong> {data.Genre}
            </p>
            <p>
              <strong>Rating:</strong> {data.imdbRating}
            </p>
            <p>
              <strong>Plot:</strong> {data.Plot}
            </p>
            <p>
              <strong>Cast:</strong> {data.Actors}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 w-full">
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 text-center">
              Genre Distribution
            </h2>
            <div className="w-full max-w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreData} className="w-full h-auto">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="genre" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-semibold mt-8 text-center">
              Ratings Distribution
            </h2>
            <div className="w-full max-w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingData} className="w-full h-auto">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MovieDetailPage;
