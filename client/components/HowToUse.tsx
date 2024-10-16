"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function HowToUse() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl px-3 ">
          Instructions
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[90vw] max-w-[500px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            How to Use easy-ghclone
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col justify-center items-start w-full py-3 sm:py-4 px-3 sm:px-5 ">
          <ol className="list-decimal pl-4 sm:pl-6  text-sm sm:text-base">
            <li>Copy the URL of the specific file or directory from GitHub.</li>
            <li>Paste the URL into the input field below.</li>
            <li>Click the "Download" button to get your files.</li>
            <li>
              Alternatively, use the "Copy CURL" button to get a command you can
              run anywhere.
            </li>
          </ol>
          <div className="flex flex-col w-full mt-3 sm:mt-4">
            <p>Example Repo URL:</p>
            <code className="bg-codebackground rounded mt-1 sm:mt-2 text-xs sm:text-sm break-all">
              https://github.com/user/project/tree/branch/src
            </code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
