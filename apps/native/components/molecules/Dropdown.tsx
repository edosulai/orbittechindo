"use client";

import { DropdownProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Button } from "../atoms";

export function Dropdown({ items, children }: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="transition-transform transform hover:scale-105"
        onPress={toggleDropdown}
      >
        {children}
      </Button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer"
              onClick={item.onClick}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
