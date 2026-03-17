import PocketBase from 'pocketbase';

const pb = new PocketBase(
  import.meta.env.VITE_PB_URL || window.location.origin
);

export default pb;

export function getFileUrl(
  record: { id: string; collectionId: string; collectionName: string },
  filename: string,
): string {
  return pb.files.getURL(record, filename);
}
