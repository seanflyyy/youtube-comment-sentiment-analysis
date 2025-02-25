import axios from 'axios';

export async function extractComments(videoUrl: string): Promise<string[]> {
  try {
    const response = await axios.post('/api/comments', { videoUrl });
    return response.data.comments;
  } catch (error) {
    console.error('Error in extractComments:', error);
    throw error;
  }
}