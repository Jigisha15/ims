import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
	private readonly logger = new Logger(CloudinaryService.name);

	constructor() {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
	}

	uploadImage(buffer: Buffer, folder?: string): Promise<UploadApiResponse> {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{ folder },
				(error: UploadApiErrorResponse, result: UploadApiResponse) => {
					if (error) {
						this.logger.error('Cloudinary upload error', error);
						return reject(error);
					}
					resolve(result);
				},
			);

			streamifier.createReadStream(buffer).pipe(uploadStream);
		});
	}

	/** Deletes an image from Cloudinary using its URL */
	async deleteImageByUrl(imageUrl: string): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				// Use regex to extract folder + public_id (e.g. "products/abc123")
				const regex = /\/upload\/(?:v\d+\/)?([^\.]+)\.[a-zA-Z]+$/;
				const match = imageUrl.match(regex);

				if (!match || !match[1]) {
					this.logger.error('Failed to extract public_id from URL', imageUrl);
					return reject(new Error('Invalid Cloudinary URL format'));
				}

				const publicId = match[1]; // e.g. "products/abc123"

				// Destroy the image on Cloudinary
				cloudinary.uploader.destroy(publicId, (error, result) => {
					if (error) {
						this.logger.error('Cloudinary deletion error', error);
						return reject(error);
					}
					this.logger.log(`Deleted Cloudinary image: ${publicId}`);
					resolve(result);
				});
			} catch (err) {
				this.logger.error('Error parsing Cloudinary URL for deletion', err);
				reject(err);
			}
		});
	}
}
