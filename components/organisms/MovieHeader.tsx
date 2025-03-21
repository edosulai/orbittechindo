'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, Input, Select } from '../atoms';

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
            <div className="mx-auto w-full max-w-6xl p-4 rounded-full border">
                <header className="flex gap-2 items-center justify-between w-full">
                    <Select
                        id="typeFilter"
                        value={typeFilter || ''}
                        onChange={handleTypeFilterChange}
                    >
                        <option value="">All</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </Select>
                    <div className="flex space-x-2">
                        <Controller
                            name="startYear"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    selected={new Date(yearRange[0], 0, 1)}
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
                                    minDate={new Date('1900-01-01')}
                                    maxDate={new Date('2023-12-31')}
                                />
                            )}
                        />
                        <Controller
                            name="endYear"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    selected={new Date(yearRange[1], 11, 31)}
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
                                    minDate={new Date('1900-01-01')}
                                    maxDate={new Date('2023-12-31')}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="title"
                                placeholder="Search by title"
                                onChange={(e) => {
                                    field.onChange(e);
                                    handleTitleChange(e.target.value);
                                }}
                            />
                        )}
                    />
                </header>
            </div>
        </>
    );
}
