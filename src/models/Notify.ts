export type NotifyData = {
	id: number;
	title: string;
	description: string | null;
	channel: string | null;
	urgent: boolean;
	created_at: string;
};
