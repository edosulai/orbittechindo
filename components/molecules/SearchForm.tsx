'use client';

import { Input, Label, Select } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { MovieFormData } from '@/schemas';

interface SearchFormProps {
    typeFilter?: string;
    yearRange: [number, number];
    handleTitleChange: (value: string) => void;
    handleTypeFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleYearRangeChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export function SearchForm({
    typeFilter,
    yearRange,
    handleTitleChange,
    handleTypeFilterChange,
    handleYearRangeChange,
}: SearchFormProps) {
    const { control } = useFormContext<MovieFormData>();

    return (
        <form className="flex flex-col gap-4">
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder="Search by title"
                        onChange={(e) => {
                            field.onChange(e);
                            handleTitleChange(e.target.value);
                        }}
                    />
                )}
            />
            <Label htmlFor="typeFilter">Type</Label>
            <Select id="typeFilter" value={typeFilter} onChange={handleTypeFilterChange}>
                <option value="">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </Select>
            <Label>Year Range</Label>
            <div className="flex gap-2">
                <Input
                    type="number"
                    value={yearRange[0]}
                    onChange={(e) => handleYearRangeChange(e, 0)}
                    placeholder="From"
                />
                <Input
                    type="number"
                    value={yearRange[1]}
                    onChange={(e) => handleYearRangeChange(e, 1)}
                    placeholder="To"
                />
            </div>
        </form>
    );
}
