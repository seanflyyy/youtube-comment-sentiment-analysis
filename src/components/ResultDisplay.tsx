/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {Card} from "@/components/ui/card";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export default function ResultDisplay({sentiment}: any) {
  // Split the sentiment analysis into sections based on numbering
  const sections = sentiment
    .split(/\d+\./)
    .filter(Boolean)
    .map((s: string) => s.trim());

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
        Sentiment Analysis Results
      </h2>

      <div className="space-y-4">
        {sections.map(
          (
            section:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined,
            index: number
          ) => (
            <div key={index} className="p-3 bg-white bg-opacity-60 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-indigo-600">
                  {index + 1}.{" "}
                </span>
                {section}
              </p>
            </div>
          )
        )}
      </div>
    </Card>
  );
}
