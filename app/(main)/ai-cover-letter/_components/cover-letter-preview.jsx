"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-6">
      <div className="bg-gray-800/40 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
        {/* Top accent border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-6">
          <div className="cover-letter-preview">
            <MDEditor 
              value={content} 
              preview="preview" 
              height={700}
              data-color-mode="dark"
              visibleDragBar={false}
            />
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      </div>

      {/* Minimal custom styles for MD Editor */}
      <style jsx global>{`
        .cover-letter-preview .w-md-editor {
          background-color: transparent !important;
          border: none !important;
        }
        
        .cover-letter-preview .w-md-editor-preview {
          background-color: rgba(31, 41, 55, 0.2) !important;
          border: 1px solid rgba(75, 85, 99, 0.3) !important;
          border-radius: 12px !important;
          padding: 32px !important;
          color: #e5e7eb !important;
          line-height: 1.7 !important;
        }
        
        .cover-letter-preview .w-md-editor-preview h1,
        .cover-letter-preview .w-md-editor-preview h2,
        .cover-letter-preview .w-md-editor-preview h3 {
          color: #ffffff !important;
          background: linear-gradient(to right, #60a5fa, #a78bfa) !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        
        .cover-letter-preview .w-md-editor-preview p {
          color: #d1d5db !important;
          margin-bottom: 16px !important;
        }
        
        .cover-letter-preview .w-md-editor-preview strong {
          color: #60a5fa !important;
        }
        
        .cover-letter-preview .w-md-editor-toolbar {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default CoverLetterPreview;