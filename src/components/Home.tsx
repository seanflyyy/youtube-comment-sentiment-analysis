"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import ResultDisplay from "./ResultDisplay";
import {extractComments} from "./CommentExtractor";
import {analyzeSentiment} from "./SentimentAnalyzer";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleExtraction = async () => {
    try {
      setLoading(true);
      setError("");
      setComments([]);
      setSentiment("");

      const extractedComments = await extractComments(videoUrl);
      setComments(extractedComments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSentimentAnalysis = async () => {
    try {
      setAnalyzing(true);
      setError("");

      const sentimentResult = await analyzeSentiment(comments);
      setSentiment(sentimentResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        YouTube Comment Sentiment Analysis
      </h1>

      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1"
            disabled={loading}
          />

          <Button
            onClick={handleExtraction}
            disabled={loading || !videoUrl}
            className="min-w-[120px]"
          >
            {loading ? "Extracting..." : "Extract"}
          </Button>
        </div>
      </Card>

      {error && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {comments.length > 0 && (
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Extracted Comments</h2>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {comments.map((comment, index) => (
              <p key={index} className="text-gray-600 p-2 bg-gray-50 rounded">
                {comment}
              </p>
            ))}
          </div>

          <Button
            onClick={handleSentimentAnalysis}
            disabled={analyzing}
            className="w-full mt-4"
            variant="secondary"
          >
            {analyzing ? "Analyzing Sentiment..." : "Analyze Sentiment"}
          </Button>
        </Card>
      )}

      {sentiment && <ResultDisplay sentiment={sentiment} />}
    </div>
  );
}
