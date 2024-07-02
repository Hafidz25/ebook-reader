import Link from "next/link";
import { Book, MoveRight } from "lucide-react";

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
import ImageUpload from "@/components/custom/file-uploader";

export default function Books() {
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
            <div className="grid gap-4 py-4">
              <ImageUpload />
            </div>
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
          <CardContent>test</CardContent>
        </Card>
      </div>
    </div>
  );
}
