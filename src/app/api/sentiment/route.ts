import {NextResponse} from "next/server";
import axios from "axios";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {comments} = await request.json();

    if (!comments || !Array.isArray(comments)) {
      return NextResponse.json({error: "Invalid comments data"}, {status: 400});
    }

    const systemPrompt = `You are a sentiment analysis expert. Analyze the sentiment of the provided comments and provide a detailed analysis including:
1. Overall sentiment (positive, negative, or neutral)
2. Key themes or patterns
3. Emotional intensity
4. Notable observations
Be concise but thorough.`;

    const userPrompt = `Analyze the sentiment of these comments:
${comments}`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error("Invalid response from OpenAI API:", response.data);
      return NextResponse.json(
        {error: "Invalid response from OpenAI API"},
        {status: 500}
      );
    }

    return NextResponse.json({
      sentiment: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {error: "Failed to analyze sentiment"},
      {status: 500}
    );
  }
}
