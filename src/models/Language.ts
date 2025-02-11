export interface DetectLanguage {
	data: Data;
}

export interface Data {
	detections: Array<Detection[]>;
}

export interface Detection {
	isReliable: boolean;
	language: string;
	confidence: number;
}
