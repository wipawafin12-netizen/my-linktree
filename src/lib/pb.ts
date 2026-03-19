import PocketBase from 'pocketbase';

// Use a dummy URL if VITE_PB_URL is not set to avoid unnecessary API calls
const pbUrl = import.meta.env.VITE_PB_URL || '';
const pb = new PocketBase(pbUrl || 'http://127.0.0.1:8090');

// Disable auto-cancellation to prevent request conflicts
pb.autoCancellation(false);

export default pb;

export const isPocketBaseEnabled = !!import.meta.env.VITE_PB_URL;

export function getFileUrl(
  record: { id: string; collectionId: string; collectionName: string },
  filename: string,
): string {
  return pb.files.getURL(record, filename);
}
