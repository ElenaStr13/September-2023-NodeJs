"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const node_crypto_1 = require("node:crypto");
const node_path_1 = __importDefault(require("node:path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../configs/config");
class S3Service {
    client;
    constructor(client = new client_s3_1.S3Client({
        region: config_1.config.AWS_S3_REGION,
        credentials: {
            accessKeyId: config_1.config.AWS_S3_ACCESS_KEY,
            secretAccessKey: config_1.config.AWS_S3_SECRET_KEY,
        },
    })) {
        this.client = client;
    }
    async uploadFile(file, itemType, itemId) {
        try {
            const filePath = this.buildPath(itemType, itemId, file.name);
            await this.client.send(new client_s3_1.PutObjectCommand({
                Bucket: config_1.config.AWS_S3_BUCKET_NAME,
                Key: filePath,
                Body: file.data,
                ContentType: file.mimetype,
                ACL: "public-read",
            }));
            return `${itemType}/${itemId}/${file.name}`;
        }
        catch (error) {
            console.error("Error upload: ", error);
        }
    }
    async deleteFile(filePath) {
        try {
            await this.client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: config_1.config.AWS_S3_BUCKET_NAME,
                Key: filePath,
            }));
        }
        catch (error) {
            console.error("Error deleting: ", error);
        }
    }
    buildPath(itemType, itemId, fileName) {
        return `${itemType}/${itemId}/${(0, node_crypto_1.randomUUID)()}${node_path_1.default.extname(fileName)}`;
    }
}
exports.s3Service = new S3Service();
