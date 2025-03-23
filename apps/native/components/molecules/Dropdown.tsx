import { AppTheme, DropdownProps } from "@/types";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../atoms";

export function Dropdown({ items, text }: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<View>(null);
  const theme = useTheme() as AppTheme;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.relative} ref={dropdownRef}>
        <Button text={text} style={styles.button} onPress={toggleDropdown} />
        {dropdownOpen && (
          <View
            style={[styles.dropdown, { backgroundColor: theme.background }]}
          >
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={item.onClick}
              >
                <Text style={[styles.itemText, { color: theme.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  relative: {
    position: "relative",
  },
  button: {
    transform: [{ scale: 1.05 }],
  },
  dropdown: {
    position: "absolute",
    right: 0,
    marginTop: 8,
    width: 192,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 50,
  },
  item: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 14,
  },
});
