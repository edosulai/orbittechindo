import { DropdownProps } from "@/types";
import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";
import { Button } from "../atoms";

export function Dropdown({ items, children }: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<View>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={tw`relative`} ref={dropdownRef}>
        <Button
          style={tw`transition-transform transform hover:scale-105`}
          onPress={toggleDropdown}
        >
          {children}
        </Button>
        {dropdownOpen && (
          <View
            style={tw`absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50`}
          >
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`block w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                onPress={item.onClick}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
