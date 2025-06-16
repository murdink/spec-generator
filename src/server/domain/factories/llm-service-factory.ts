import { FakeLlmAdapter } from "@/server/adapters/fake-llm-adapter";
import { OpenAiAdapter } from "@/server/adapters/open-ai-adapter";
import type { LlmService } from "../ports/llm-service";

export function createLlmService(): LlmService {
  if (process.env.LLM_ADAPTER === "openai") {
    return new OpenAiAdapter();
  }
  return new FakeLlmAdapter();
}
