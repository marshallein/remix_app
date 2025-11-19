-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "customer" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
