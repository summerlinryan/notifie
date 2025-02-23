-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "line" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "deliverTime" TIMESTAMP(3) NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
