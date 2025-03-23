import { Button, Footer, LoadingSpinner } from "@/components";
import { useProtectedRoute, useValidImage } from "@/hooks";
import { fetchMovieById } from "@/services";
import { DarkTheme, LightTheme } from "@/themes";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Bar, CartesianChart } from "victory-native";

export default function MovieDetailPage() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Button onPress={handleBackClick} isLoading={isLoading} text="Back" />
        <Text style={[styles.title, { color: theme.text }]}>{data.Title}</Text>
        <View style={styles.movieInfoContainer}>
          {isValidImage ? (
            <Image source={{ uri: data.Poster }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text
                style={[styles.imagePlaceholderText, { color: theme.text }]}
              >
                Image Not Available
              </Text>
            </View>
          )}
          <View style={styles.movieDetails}>
            <Text style={[styles.detailText, { color: theme.text }]}>
              <Text style={styles.boldText}>Year:</Text> {data.Year}
            </Text>
            <Text style={[styles.detailText, { color: theme.text }]}>
              <Text style={styles.boldText}>Genre:</Text> {data.Genre}
            </Text>
            <Text style={[styles.detailText, { color: theme.text }]}>
              <Text style={styles.boldText}>Rating:</Text> {data.imdbRating}
            </Text>
            <Text style={[styles.detailText, { color: theme.text }]}>
              <Text style={styles.boldText}>Plot:</Text> {data.Plot}
            </Text>
            <Text style={[styles.detailText, { color: theme.text }]}>
              <Text style={styles.boldText}>Cast:</Text> {data.Actors}
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View>
            <Text style={[styles.chartTitle, { color: theme.text }]}>
              Genre Distribution
            </Text>
            <View style={styles.chart}>
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
            <Text style={[styles.chartTitle, { color: theme.text }]}>
              Ratings Distribution
            </Text>
            <View style={styles.chart}>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  movieInfoContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  imagePlaceholder: {
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  imagePlaceholderText: {
    color: "#000",
  },
  movieDetails: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  chartContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  chart: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});
