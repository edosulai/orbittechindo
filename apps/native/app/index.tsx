import { Footer, LoadingSpinner, MovieCard, MovieHeader } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { MovieFormData, movieSchema } from "@/schemas";
import { fetchMovieQuery } from "@/services";
import { useMovieStore } from "@/stores";
import { MoviePoster } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import MasonryList from "@react-native-seoul/masonry-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import RNCarousel from "react-native-reanimated-carousel";
import tw from "twrnc";

export default function HomeScreen() {
  const methods = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: useMovieStore.getState(),
  });

  const {
    title,
    typeFilter,
    yearRange,
    setTitle,
    setTypeFilter,
    setYearRange,
  } = useMovieStore();
  const [movies, setMovies] = useState<MoviePoster[]>([]);
  const loadMoreRef = useRef(null);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-movie", title, typeFilter, yearRange],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchMovieQuery(
        title || "all",
        typeFilter || "",
        pageParam
      );
      if (result.Response === "False") {
        throw new Error(result.Error);
      }
      const filteredResults = (result.Search || []).filter((movie) => {
        const movieYear = parseInt(movie.Year, 10);
        return movieYear >= yearRange[0] && movieYear <= yearRange[1];
      });
      return filteredResults;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setMovies(data.pages.flat());
    }
  }, [data]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (
      isCloseToBottom(event.nativeEvent) &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const { isAuthenticated, authIsLoading, logout } = useProtectedRoute();
  if (!authIsLoading && !isAuthenticated) {
    logout();
  }

  const handleTitleChange = debounce((value: string) => {
    setTitle(value);
  }, 300);

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleYearRangeChange = (value: [number, number]) => {
    setYearRange(value);
  };

  const handleMovieClick = (imdbID: string) => {
    router.push(`/${imdbID}`);
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <FormProvider {...methods}>
        <MovieHeader
          handleTitleChange={handleTitleChange}
          handleTypeFilterChange={handleTypeFilterChange}
          handleYearRangeChange={handleYearRangeChange}
        />
      </FormProvider>

      <RNCarousel
        loop
        width={Dimensions.get("window").width}
        height={300}
        data={movies.slice(0, 5)}
        scrollAnimationDuration={1000}
        mode="parallax"
        containerStyle={tw`w-full items-center`}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 270,
          parallaxAdjacentItemScale: 0.8,
        }}
        renderItem={({ item: movie, index }) => {
          return (
            <MotiView
              style={tw`flex-1 items-center`}
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard
                movie={movie}
                handleMovieClick={handleMovieClick}
                style={tw`w-[200px] h-[300px]`}
              />
            </MotiView>
          );
        }}
      />

      <MasonryList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        style={tw`items-center justify-center gap-4`}
        contentContainerStyle={tw``}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          return (
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard
                movie={item as MoviePoster}
                handleMovieClick={handleMovieClick}
                style={tw`w-full mb-4`}
              />
            </MotiView>
          );
        }}
      />

      {isLoading && <LoadingSpinner />}
      {error && <Text>{error.message}</Text>}
      {hasNextPage ? (
        <View ref={loadMoreRef} />
      ) : (
        <Footer style={tw`mt-16`} />
      )}
    </View>
  );
}

// export { default } from './demo';