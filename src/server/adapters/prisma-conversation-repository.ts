import type { PrismaClient } from "@prisma/client";
import type { Conversation } from "../domain/entities/conversation";
import type { Message } from "../domain/entities/message";
import type { ConversationRepository } from "../domain/ports/conversation-repository";

export class PrismaConversationRepository implements ConversationRepository {
	constructor(private readonly db: PrismaClient) {}

	public async findConversationById(
		conversationId: number,
	): Promise<Conversation | null> {
		const conversation = await this.db.conversation.findUnique({
			where: { id: conversationId },
			include: { messages: true },
		});

		if (!conversation) {
			return null;
		}

		return conversation;
	}

	public async addMessage(
		message: Omit<Message, "id" | "createdAt">,
	): Promise<void> {
		await this.db.message.create({
			data: message,
		});
	}

	public async updateDocument(
		documentId: number,
		content: string,
	): Promise<void> {
		await this.db.document.update({
			where: { id: documentId },
			data: { content },
		});
	}
}
