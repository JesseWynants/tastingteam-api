import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

class R2Client {
    private client: S3Client;
    private bucket: string;
    private endpoint: string;

    constructor(endPoint: string, accessKeyId: string, secretAccessKey: string, bucket: string) {
        this.bucket = bucket;
        this.endpoint = endPoint;
        this.client = new S3Client({
            region: 'auto',
            endpoint: `${endPoint}`,
            credentials: {
                accessKeyId,
                secretAccessKey,
            }
        });
    }

    async uploadBuffer(buffer: ArrayBuffer | ArrayBufferView, filename: string, contentType: string): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: filename,
                Body: buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : new Uint8Array(buffer.buffer),
                ContentType: contentType,
            });

            await this.client.send(command);
            return filename;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to upload to R2: ${message}`);
        }
    }
}

export { R2Client };