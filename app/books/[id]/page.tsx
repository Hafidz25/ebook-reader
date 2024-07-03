"use client";
import Link from "next/link";
import { Book, ChevronLeft, FileText, FileWarning } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import PdfAnnotator from "@/components/custom/pfd-annotator";
import PdfViewer from "@/components/custom/pdf-viewer";

interface Books {
  id: string;
  title: string;
  content: string;
}

export default function DetailBook({ params }: { params: { id: string } }) {
  const { control, handleSubmit } = useForm();
  const [books, setBooks] = useState<Books>();
  const [load, setLoad] = useState(false);

  const router = useRouter();

  // console.log(books);

  useEffect(() => {
    fetch(`/api/books/${params.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoad(true);
      });
  }, []);

  const submitData = async (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    // console.log(formData);
    fetch("api/books", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        location.reload();
        toast.success("Book has been added");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        {/* <h1 className="text-3xl font-semibold">Books</h1> */}
        <Link href="" onClick={() => router.back()}>
          <Button variant={"outline"} className="flex gap-2 items-center">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="mx-auto  w-full max-w-6xl items-start gap-6">
        {load ? (
          <Card x-chunk="">
            <CardHeader>
              <CardTitle>{books?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* {books?.content && <PdfAnnotator url={books?.content} />} */}
              {/* {books?.content && <PdfViewer fileUrl={books?.content} />} */}
              <div className="flex gap-3">
                <Link
                  //@ts-ignore
                  href={books?.content}
                  target="_blank"
                  className="flex flex-col gap-3 items-center border-2 border-slate-200 hover:bg-slate-100 transition duration-300 min-w-32 min-h-36 rounded-lg py-6 px-4"
                >
                  {books?.content ? (
                    <FileText className="w-16 h-16" />
                  ) : (
                    <FileWarning className="w-16 h-16" />
                  )}
                  <div>Open PDF</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
