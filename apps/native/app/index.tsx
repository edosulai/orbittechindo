import { Carousel, Footer, Masonry, MovieHeader } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { MovieFormData, movieSchema } from "@/schemas";
import { fetchMovieQuery } from "@/services";
import { useMovieStore } from "@/stores";
import { MoviePoster } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
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
    const paddingToBottom = 20;
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
    <ScrollView
      contentContainerStyle={tw`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16`}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <FormProvider {...methods}>
        <MovieHeader
          handleTitleChange={handleTitleChange}
          handleTypeFilterChange={handleTypeFilterChange}
          handleYearRangeChange={handleYearRangeChange}
        />
      </FormProvider>
      <View
        style={tw`flex flex-col gap-8 sm:gap-16 row-start-2 items-center justify-center`}
      >
        <Carousel
          list={movies.slice(0, 5)}
          handleMovieClick={handleMovieClick}
        />
        <Masonry list={movies} handleMovieClick={handleMovieClick} />

        {isLoading && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
        {hasNextPage && <View ref={loadMoreRef} style={tw`h-14`} />}
      </View>
      {!hasNextPage && <Footer />}
    </ScrollView>
  );
}
