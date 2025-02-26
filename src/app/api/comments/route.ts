import {NextResponse} from "next/server";
import axios from "axios";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {videoUrl} = await request.json();

    if (!videoUrl) {
      return NextResponse.json({error: "Video URL is required"}, {status: 400});
    }

    const response = await axios.post(
      "https://api.agentql.com/v1/query-data",
      {
        query: "{ comments[] { text } }",
        url: videoUrl,
        params: {
          wait_for: 5,
          is_scroll_to_bottom_enabled: true,
          mode: "fast",
          is_screenshot_enabled: false,
        },
      },
      {
        headers: {
          "X-API-Key": process.env.AGENTQL_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.data?.comments) {
      console.error("Invalid response from AgentQL API:", response.data);
      return NextResponse.json(
        {error: "Invalid response from AgentQL API"},
        {status: 500}
      );
    }

    const comments = response.data.data.comments.map(
      (comment: {text: string}) => comment.text
    );
    return NextResponse.json({comments});
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {error: "Failed to extract comments"},
      {status: 500}
    );
  }
}
