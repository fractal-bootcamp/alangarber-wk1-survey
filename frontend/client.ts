import { treaty } from "@elysiajs/eden";
import type { ApiApp } from "../index.ts";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const apiClient = treaty<ApiApp>(API_BASE_URL);

export default apiClient;
