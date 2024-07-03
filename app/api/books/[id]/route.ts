import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const books = await prisma.book.findUnique({
    select: {
      id: true,
      content: true,
      title: true,
    },
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(books);
}
