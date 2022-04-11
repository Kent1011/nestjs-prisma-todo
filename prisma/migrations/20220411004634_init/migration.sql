-- CreateTable
CREATE TABLE "task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "sub_title" TEXT,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "date_finished" DATETIME,
    "deadline" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "task_id_key" ON "task"("id");
