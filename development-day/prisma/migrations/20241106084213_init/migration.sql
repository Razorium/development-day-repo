-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "familyName" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "university" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
