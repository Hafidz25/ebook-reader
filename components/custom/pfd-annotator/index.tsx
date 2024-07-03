"use client";
// components/PdfAnnotator.tsx
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfAnnotator: React.FC<{ url: string }> = ({ url }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const loadPdf = async () => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPdfDoc(pdfDoc);
      setNumPages(pdfDoc.getPageCount());
    };
    loadPdf();
  }, [url]);

  const handleAddNote = async (pageIndex: number, note: string) => {
    if (!pdfDoc) return;
    const pages = pdfDoc.getPages();
    const page = pages[pageIndex];
    page.drawText(note, {
      x: 50,
      y: 700,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // For demonstration purposes, download the updated PDF
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "annotated.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNoteSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    pageIndex: number
  ) => {
    event.preventDefault();
    handleAddNote(pageIndex, note);
    setNote("");
  };

  return (
    <div>
      {numPages && (
        <>
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={console.error}
          >
            <Page pageNumber={currentPage} />
          </Document>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
            >
              Previous Page
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, numPages))
              }
              disabled={currentPage >= numPages}
            >
              Next Page
            </button>
          </div>
          <form onSubmit={(event) => handleNoteSubmit(event, currentPage - 1)}>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              required
            />
            <button type="submit">Add Note</button>
          </form>
        </>
      )}
    </div>
  );
};

export default PdfAnnotator;
