"use client";
import Link from "next/link";
import { Book, MoveRight, FileText, FileWarning } from "lucide-react";
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

interface Books {
  id: string;
  title: string;
  content: string;
}

export default function Books() {
  const { control, handleSubmit } = useForm();
  const [books, setBooks] = useState<Books[]>([]);
  const [load, setLoad] = useState(false);

  const router = useRouter();

  // console.log(books);

  useEffect(() => {
    fetch("/api/books", { method: "GET" })
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
      <div className="mx-auto flex justify-end w-full max-w-6xl gap-2">
        {/* <h1 className="text-3xl font-semibold">Books</h1> */}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center">
              <Book className="w-4 h-4" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(submitData)}
              className="grid gap-4 py-4"
            >
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Input title..."
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <Input
                    type="file"
                    placeholder="Insert file..."
                    onChange={(e) => {
                      if (e.target.files) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                  />
                )}
              />
              <Button type="submit">Add Book</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto  w-full max-w-6xl items-start gap-6">
        <Card x-chunk="">
          <CardHeader>
            <CardTitle>Books</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {load ? (
              <div className="flex gap-3">
                {books.length ? (
                  <div className="flex gap-3">
                    {books.map((book) => (
                      <Link
                        href={`/books/${book.id}`}
                        className="flex flex-col gap-3 items-center border-2 border-slate-200 hover:bg-slate-100 transition duration-300 min-w-32 min-h-36 rounded-lg py-6 px-4"
                      >
                        {book.content ? (
                          <FileText className="w-16 h-16" />
                        ) : (
                          <FileWarning className="w-16 h-16" />
                        )}
                        <div>{book.title}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div>No Result</div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
