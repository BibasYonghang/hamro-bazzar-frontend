import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat.jsx";

export const AIChatContext = createContext(null);

const STORAGE_KEY = "hamroBazzarAiChatState";
const DEFAULT_FILTERS = {
  category: "all",
  minPrice: "",
  maxPrice: "",
  topK: 4,
  similarityThreshold: 0.62,
};

const initialMessages = [
  {
    id: "assistant-welcome",
    role: "assistant",
    text: "Hello! I can help you discover products, answer shopping questions, and recommend items from the catalog.",
  },
];

const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const AIChatProvider = ({ children }) => {
  const savedState = loadSavedState();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(() => savedState?.filters || DEFAULT_FILTERS);
  const navigate = useNavigate();

  const {
    messages,
    products,
    cart,
    orders,
    loading,
    error,
    send,
    addMessage,
  } = useChat({
    initialMessages: savedState?.messages || initialMessages,
    initialProducts: savedState?.products || [],
    initialCart: savedState?.cart || [],
    initialOrders: savedState?.orders || [],
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, products, filters, cart, orders }),
    );
  }, [messages, products, filters, cart, orders]);


  const toggleChat = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const updateFilters = useCallback((update) => {
    setFilters((current) => ({ ...current, ...update }));
  }, []);

  const sendMessage = useCallback(
    async (messageText) => {
      const trimmed = messageText?.trim();
      if (!trimmed || loading) return;

      const payload = {
        category: filters.category !== "all" ? filters.category : undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        topK: filters.topK,
        similarityThreshold: filters.similarityThreshold,
      };

      const response = await send(messageText, payload);
      if (response?.type === "navigation" && response.path) {
        navigate(response.path);
      }
    },
    [filters, loading, navigate, send],
  );

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      products,
      cart,
      orders,
      filters,
      loading,
      error,
      sendMessage,
      toggleChat,
      closeChat,
      updateFilters,
    }),
    [isOpen, messages, products, cart, orders, filters, loading, error, sendMessage, toggleChat, closeChat, updateFilters],
  );

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
};
