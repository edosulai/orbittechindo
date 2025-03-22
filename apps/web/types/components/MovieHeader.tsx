'use client';

export interface MovieHeaderProps {
    typeFilter?: string;
    yearRange: [number, number];
    handleTitleChange: (title: string) => void;
    handleTypeFilterChange: (type: string) => void;
    handleYearRangeChange: (range: [number, number]) => void;
}