import axios from 'axios';

export async function analyzeSentiment(comments: string[]): Promise<string> {
  try {
    const response = await axios.post('/api/sentiment', { comments });
    return response.data.sentiment;
  } catch (error) {
    console.error('Error in analyzeSentiment:', error);
    throw error;
  }
}