'use client';

import Image from 'next/image';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

export interface MovieHeaderProps {
    typeFilter?: string;
    yearRange: [number, number];
    handleTitleChange: (value: string) => void;
    handleTypeFilterChange: (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => void;
    handleYearRangeChange: (value: [number, number]) => void;
}

export function MovieHeader({
    typeFilter,
    yearRange,
    handleTitleChange,
    handleTypeFilterChange,
    handleYearRangeChange,
}: MovieHeaderProps) {
    const { control } = useForm();

    return (
        <>
            <div className="mx-auto w-full max-w-6xl border-b bg-background px-4 py-2 lg:my-4 lg:rounded-full lg:border">
                <header className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-2 z-50">
                        <Image
                            alt="Logo"
                            src="/vercel.svg"
                            width={24}
                            height={24}
                        />
                        <nav className="relative z-10 flex max-w-max flex-1 items-center justify-center">
                            <div className="relative">
                                <ul
                                    data-orientation="horizontal"
                                    className="flex flex-1 list-none items-center justify-center space-x-1"
                                    dir="ltr"
                                >
                                    <select
                                        id="typeFilter"
                                        value={typeFilter || ''}
                                        onChange={handleTypeFilterChange}
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <option value="">All</option>
                                        <option value="movie">Movie</option>
                                        <option value="series">Series</option>
                                    </select>
                                    <div className="flex space-x-2">
                                        <Controller
                                            name="startYear"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    {...field}
                                                    selected={
                                                        new Date(
                                                            yearRange[0],
                                                            0,
                                                            1,
                                                        )
                                                    }
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                        handleYearRangeChange([
                                                            date
                                                                ? date.getFullYear()
                                                                : yearRange[0],
                                                            yearRange[1],
                                                        ]);
                                                    }}
                                                    showYearPicker
                                                    dateFormat="yyyy"
                                                    minDate={
                                                        new Date('1900-01-01')
                                                    }
                                                    maxDate={
                                                        new Date('2023-12-31')
                                                    }
                                                    className="items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 flex justify-between gap-2 px-3 text-sm text-muted-foreground"
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="endYear"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    {...field}
                                                    selected={
                                                        new Date(
                                                            yearRange[1],
                                                            11,
                                                            31,
                                                        )
                                                    }
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                        handleYearRangeChange([
                                                            yearRange[0],
                                                            date
                                                                ? date.getFullYear()
                                                                : yearRange[1],
                                                        ]);
                                                    }}
                                                    showYearPicker
                                                    dateFormat="yyyy"
                                                    minDate={
                                                        new Date('1900-01-01')
                                                    }
                                                    maxDate={
                                                        new Date('2023-12-31')
                                                    }
                                                    className="items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 flex justify-between gap-2 px-3 text-sm text-muted-foreground"
                                                />
                                            )}
                                        />
                                    </div>
                                </ul>
                            </div>
                            <div className="absolute left-0 top-full flex justify-center"></div>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="title"
                                    placeholder="Search by title"
                                    className="items-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 py-2 flex justify-between gap-2 px-3 text-sm text-muted-foreground"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleTitleChange(e.target.value);
                                    }}
                                />
                            )}
                        />
                    </div>
                </header>
            </div>
        </>
    );
}
