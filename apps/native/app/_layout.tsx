import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { AnimatePresence, motion } from "framer-motion";
import { View } from "react-native";

import "../styles/globals.css";

const queryClient = new QueryClient();

const MotionView = motion.create(View);

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <MotionView
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Stack />
        </MotionView>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
