import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsVersion from "pdfjs-dist/package.json";

const PdfViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  // Set the worker URL using the version from pdfjs-dist
  const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  return (
    <div>
      <div style={{ height: "750px" }}>
        <Document
          file={fileUrl}
          onLoadSuccess={() => console.log("PDF loaded successfully")}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
