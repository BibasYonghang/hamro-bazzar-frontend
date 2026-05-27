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
      console.debug("AI chat payload", buildChatPath(), payload);
    }

    const response = await client.post(buildChatPath(), payload);
    if (!response.data?.success) {
      throw new Error(response.data?.error || "AI assistant request failed.");
    }

    if (import.meta.env.DEV) {
      console.debug("AI chat response", response.data);
    }

    return response.data;
  } catch (error) {
    const apiError = error?.response?.data?.error;
    if (apiError) {
      throw new Error(apiError);
    }
    if (error?.message) {
      throw new Error(error.message);
    }
    throw new Error("AI assistant request failed.");
  }
};
