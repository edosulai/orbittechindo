import { Button, Footer, LoadingSpinner } from "@/components";
import { useProtectedRoute, useValidImage } from "@/hooks";
import { fetchMovieById } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import tw from "twrnc";

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
    value: 1,
    label: genre,
  }));
  const ratingData = data.Ratings.map((rating) => ({
    value: parseFloat(rating.Value),
    label: rating.Source,
  }));

  const handleBackClick = () => {
    setIsLoading(true);
    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={tw`bg-gray-100 items-stretch p-4 pt-20`}
    >
      <View style={tw`gap-6`}>
        <Button
          onPress={handleBackClick}
          isLoading={isLoading}
          style={tw`mr-auto`}
        >
          <Text style={tw`text-center text-white`}>Back</Text>
        </Button>
        <Text style={tw`text-2xl sm:text-3xl font-bold`}>{data.Title}</Text>
        <View style={tw`sm:flex-row gap-4`}>
          <View style={tw`w-full flex-row gap-4`}>
            {isValidImage ? (
              <Image
                source={{ uri: data.Poster }}
                style={tw`w-[150px] h-[225px] rounded-lg shadow-md`}
              />
            ) : (
              <View
                style={tw`w-[150px] h-[225px] items-center justify-center bg-gray-200 rounded-md`}
              >
                <Text style={tw`text-gray-900`}>Image Not Available</Text>
              </View>
            )}
            <View style={tw`space-y-2 flex-1`}>
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
        </View>

        <View style={tw`sm:flex-row gap-8`}>
          <View>
            <Text
              style={tw`text-xl sm:text-2xl font-semibold mt-8 text-center`}
            >
              Genre Distribution
            </Text>
            <BarChart
              data={genreData}
              barWidth={100}
              barBorderRadius={4}
              frontColor="#4CAF50"
              yAxisThickness={0}
              xAxisThickness={0}
              height={200}
              noOfSections={3}
            />
          </View>

          <View>
            <Text
              style={tw`text-xl sm:text-2xl font-semibold mt-8 text-center`}
            >
              Ratings Distribution
            </Text>
            <BarChart
              data={ratingData}
              barWidth={100}
              barBorderRadius={4}
              frontColor="#FF9800"
              yAxisThickness={0}
              xAxisThickness={0}
              height={200}
              noOfSections={3}
            />
          </View>
        </View>
        <Footer style={tw`mt-16`} />
      </View>
    </ScrollView>
  );
}
