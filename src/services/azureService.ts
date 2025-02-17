import { BlobServiceClient } from '@azure/storage-blob';

const azureBlobUrl = process.env.AZURE_BLOB_SAS_URL!;
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_CONTAINER_NAME!;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

/**
 * Lista as perguntas e respostas do Azure com base na certificação.
 */
export const listQuestionsWithImages = async (certification: string) => {
  const blobs = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    if (blob.name.includes(certification.toLowerCase())) {
      blobs.push(blob.name);
    }
  }

  // Mapeia perguntas e respostas com base no nome
  const questions = blobs
    .filter(name => name.startsWith('pergunta_'))
    .map(name => {
      const number = name.match(/\d+/)?.[0]; // Extrai número da pergunta
      return {
        title: `Pergunta ${number}`,
        image: `${azureBlobUrl}/${name}`,
        answer: `${azureBlobUrl}/resposta_${number}.jpg`,
      };
    });

  return questions;
};
