import { useCallback, useMemo, useState } from "react";
import { sendChatPayload } from "../services/aiChatService.js";

const initialMessages = [
  {
    id: "assistant-welcome",
    role: "assistant",
    text: "Hello! I can help you discover products, answer shopping questions, and recommend items from the catalog.",
  },
];

export const useChat = ({
  initialMessages: initialMessagesProp,
  initialProducts = [],
  initialCart = [],
  initialOrders = [],
} = {}) => {
  const [messages, setMessages] = useState(initialMessagesProp ?? initialMessages);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState(initialCart);
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleAIResponse = useCallback(
    (response) => {
      switch (response.type) {
        case "search":
        case "recommendation":
          setProducts(response.products || []);
          break;

        case "cart":
          setCart(response.cart || []);
          break;

        case "order":
          setOrders((prevOrders) => [...prevOrders, response.order]);
          break;

        case "support":
        case "chat":
        default:
          break;
      }

      addMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: response.answer || "I couldn't find an answer to that.",
      });
    },
    [addMessage],
  );

  const send = useCallback(
    async (message, payload = {}) => {
      const trimmed = message?.trim();
      if (!trimmed || loading) return;

      setLoading(true);
      setError(null);
      addMessage({ id: `user-${Date.now()}`, role: "user", text: trimmed });

      try {
        const response = await sendChatPayload({ message: trimmed, ...payload });
        handleAIResponse(response);
        return response;
      } catch (err) {
        const messageText = err?.message || "Something went wrong. Please try again.";
        setError(messageText);
        addMessage({
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: messageText,
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addMessage, handleAIResponse, loading],
  );

  return useMemo(
    () => ({
      messages,
      products,
      cart,
      orders,
      loading,
      error,
      send,
      addMessage,
      setProducts,
      setCart,
      setOrders,
    }),
    [messages, products, cart, orders, loading, error, send, addMessage],
  );
};
