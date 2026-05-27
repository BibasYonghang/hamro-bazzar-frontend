import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { sendChatPayload } from "../services/aiChatService.js";

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
  const [messages, setMessages] = useState(() => savedState?.messages || initialMessages);
  const [products, setProducts] = useState(() => savedState?.products || []);
  const [filters, setFilters] = useState(() => savedState?.filters || DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, products, filters }),
    );
  }, [messages, products, filters]);

  const addMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

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

      addMessage({ id: `user-${Date.now()}`, role: "user", text: trimmed });
      setLoading(true);
      setError(null);

      try {
        const payload = {
          message: trimmed,
          category: filters.category !== "all" ? filters.category : undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          topK: filters.topK,
          similarityThreshold: filters.similarityThreshold,
        };

        const data = await sendChatPayload(payload);
        addMessage({ id: `assistant-${Date.now()}`, role: "assistant", text: data.answer });
        setProducts(data.products || []);
      } catch (err) {
        const message = err?.message || "Unable to connect to the shopping assistant.";
        setError(message);
        addMessage({
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: "Sorry, I couldn't process your question. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    },
    [addMessage, filters, loading],
  );

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      products,
      filters,
      loading,
      error,
      sendMessage,
      toggleChat,
      closeChat,
      updateFilters,
    }),
    [isOpen, messages, products, filters, loading, error, sendMessage, toggleChat, closeChat, updateFilters],
  );

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
};
