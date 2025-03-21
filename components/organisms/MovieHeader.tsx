'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, Input, Select, Button } from '../atoms';
import Image from 'next/image';
import { useAuthStore } from '@/stores';

export interface MovieHeaderProps {
    typeFilter?: string;
    yearRange: [number, number];
    handleTitleChange: (title: string) => void;
    handleTypeFilterChange: (type: string) => void;
    handleYearRangeChange: (range: [number, number]) => void;
}

export function MovieHeader({
    typeFilter,
    yearRange,
    handleTitleChange,
    handleTypeFilterChange,
    handleYearRangeChange,
}: MovieHeaderProps) {
    const logout = useAuthStore((state) => state.logout);
    const { control } = useForm();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="mx-auto w-full max-w-6xl p-4 rounded-full border">
                <header className="flex gap-2 items-center justify-between w-full">
                    <Select
                        id="typeFilter"
                        value={typeFilter || ''}
                        onChange={(e) => handleTypeFilterChange(e.target.value)}
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
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            handleTitleChange(e.target.value);
                        }}
                        placeholder="Search by title"
                    />
                    <div className="relative" ref={dropdownRef}>
                        <Button
                            className="transition-transform transform hover:scale-105"
                            onClick={toggleDropdown}
                        >
                            <Image
                                src="/vercel.svg"
                                alt="Account"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                        </Button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>
            </div>
        </>
    );
}
