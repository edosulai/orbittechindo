"use client";

import React from "react"; // Add this line
import { Carousel, Footer, Masonry, MovieHeader } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { MovieFormData, movieSchema } from "@/schemas";
import { fetchMovieQuery } from "@/services";
import { useMovieStore } from "@/stores";
import { MoviePoster } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
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
        pageParam,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 10 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16">
      <FormProvider {...methods}>
        <MovieHeader
          handleTitleChange={handleTitleChange}
          handleTypeFilterChange={handleTypeFilterChange}
          handleYearRangeChange={handleYearRangeChange}
        />
      </FormProvider>
      <main className="flex flex-col gap-8 sm:gap-16 row-start-2 items-center justify-center">
        <Carousel
          list={movies.slice(0, 5)}
          handleMovieClick={handleMovieClick}
        />
        <Masonry list={movies} handleMovieClick={handleMovieClick} />

        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {hasNextPage && <div ref={loadMoreRef} className="h-14" />}
      </main>
      {!hasNextPage && <Footer />}
    </div>
  );
}
