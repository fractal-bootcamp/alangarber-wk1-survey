import { treaty } from "@elysiajs/eden";
import type { ApiApp } from "../index.ts";

const apiClient = treaty<ApiApp>("localhost:3000");

export default apiClient;
