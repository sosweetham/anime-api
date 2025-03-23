import { S3Client } from "bun";

/**
 * @author SoSweetHam
 * @param bucket The bucket name to create/use
 * @returns A new S3Client instance with the specified bucket
 */
export const bucketCreator = (bucket: string) => {
  return new S3Client({
    endpoint: "http://anime-api-seaweedfs:8333", // Change this if running remotely
    accessKeyId: "your_access_key",
    secretAccessKey: "your_secret_key",
    bucket,
    region: "us-east-1",
  });
};
