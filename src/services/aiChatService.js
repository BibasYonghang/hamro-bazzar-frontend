import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const normalizedBase = API_BASE.replace(/\/$/, "");

const client = axios.create({
  baseURL: normalizedBase,
  timeout: 30000,
});

const buildChatPath = () => {
  if (normalizedBase.endsWith("/api")) {
    return "/ai/chat";
  }
  return "/api/ai/chat";
};

export const sendChatPayload = async (payload) => {
  try {
    if (import.meta.env.DEV) {
      console.debug("AI chat payload:", buildChatPath(), payload);
    }

    const { data } = await client.post(buildChatPath(), payload);

    if (!data) {
      throw new Error("Empty response from AI server");
    }

    if (import.meta.env.DEV) {
      console.debug("AI chat response:", data);
    }

    return {
      type: data.type || "chat",
      answer: data.answer || "",
      products: data.products || [],
      cart: data.cart || [],
      order: data.order || null,
      path: data.path || null,
      label: data.label || null,
      metadata: data.metadata || {},
    };
  } catch (error) {
    const apiError = error?.response?.data?.error;
    throw new Error(apiError || error.message || "AI request failed");
  }
};
