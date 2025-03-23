import { useValidImage } from "@/hooks";
import { DarkTheme, LightTheme } from "@/themes";
import { MovieCardProps } from "@/types";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export function MovieCard({ movie, handleMovieClick }: MovieCardProps) {
  const isValidImage = useValidImage(movie.Poster);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.background }]}
      onPress={() => handleMovieClick(movie.imdbID)}
    >
      <View style={styles.imageContainer}>
        {isValidImage ? (
          <Image source={{ uri: movie.Poster }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={[styles.imagePlaceholderText, { color: theme.text }]}>
              Image Not Available
            </Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {movie.Title}
          </Text>
          <Text style={[styles.year, { color: theme.text }]}>{movie.Year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 8,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
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
    fontSize: 16,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
  },
});
