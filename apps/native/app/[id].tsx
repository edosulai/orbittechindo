import { Button, Footer, LoadingSpinner } from "@/components";
import { useProtectedRoute, useValidImage } from "@/hooks";
import { fetchMovieById } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { Bar, CartesianChart } from "victory-native";

export default function MovieDetailPage() {
  const { id } = useLocalSearchParams();
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
    return <Text>{error.message}</Text>;
  }

  if (!data) {
    return <Text>No movie data found</Text>;
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
    <ScrollView
      contentContainerStyle={tw`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16`}
    >
      <View
        style={tw`flex flex-col gap-8 row-start-2 items-center sm:items-start`}
      >
        <Button onPress={handleBackClick} isLoading={isLoading}>
          <Text>Back</Text>
        </Button>
        <Text style={tw`text-2xl sm:text-3xl font-bold`}>{data.Title}</Text>
        <View style={tw`flex flex-col sm:flex-row gap-4`}>
          {isValidImage ? (
            <Image
              source={{ uri: data.Poster }}
              style={tw`rounded-lg shadow-md`}
            />
          ) : (
            <View
              style={tw`w-[200px] h-[300px] flex items-center justify-center bg-gray-200 rounded-md`}
            >
              <Text style={tw`text-gray-900`}>Image Not Available</Text>
            </View>
          )}
          <View style={tw`space-y-2`}>
            <Text>
              <Text style={tw`font-bold`}>Year:</Text> {data.Year}
            </Text>
            <Text>
              <Text style={tw`font-bold`}>Genre:</Text> {data.Genre}
            </Text>
            <Text>
              <Text style={tw`font-bold`}>Rating:</Text> {data.imdbRating}
            </Text>
            <Text>
              <Text style={tw`font-bold`}>Plot:</Text> {data.Plot}
            </Text>
            <Text>
              <Text style={tw`font-bold`}>Cast:</Text> {data.Actors}
            </Text>
          </View>
        </View>

        <View style={tw`flex flex-col sm:flex-row gap-8`}>
          <View>
            <Text
              style={tw`text-xl sm:text-2xl font-semibold mt-8 text-center`}
            >
              Genre Distribution
            </Text>
            <View style={tw`w-full max-w-full overflow-x-auto`}>
              <CartesianChart data={genreData} xKey="genre" yKeys={["count"]}>
                {({ points, chartBounds }) => (
                  <Bar
                    points={points.count}
                    chartBounds={chartBounds}
                    color="#8884d8"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                  />
                )}
              </CartesianChart>
            </View>
          </View>

          <View>
            <Text
              style={tw`text-xl sm:text-2xl font-semibold mt-8 text-center`}
            >
              Ratings Distribution
            </Text>
            <View style={tw`w-full max-w-full overflow-x-auto`}>
              <CartesianChart data={ratingData} xKey="source" yKeys={["value"]}>
                {({ points, chartBounds }) => (
                  <Bar
                    points={points.value}
                    chartBounds={chartBounds}
                    color="#82ca9d"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                  />
                )}
              </CartesianChart>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
