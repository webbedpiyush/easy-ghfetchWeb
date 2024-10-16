"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RotatingLines } from "react-loader-spinner";
import { FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function parseGitHubUrl(url: string) {
  const urlPieces = url.split("/");

  if (urlPieces.length < 7) {
    return null;
  }
  if (urlPieces[5] !== "tree" && urlPieces[5] !== "blob") {
    return null;
  }
  const user = urlPieces[3];
  const repo = urlPieces[4];
  const branch = urlPieces[6] ?? "main";

  return { user, repo, branch };
}

function checkUrl(url: string) {
  const parsedUrl = parseGitHubUrl(url);
  if (!parsedUrl || !parsedUrl.user || !parsedUrl.repo || !parsedUrl.branch) {
    return false;
  }
  return true;
}

export default function Fetcher() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const backendUrl = ""; //TODO will place the backend url here

  useEffect(
    function () {
      if (checkUrl(url) && url != "") {
        setShowLink(url.trim() !== ""); // trim saari whitespace hata dega
      } else {
        setShowLink(false);
      }
    },
    [url]
  );

  function trim(url: string) {
    return url.length > 15 ? `${url.slice(0, 20)}....` : url;
  }

  async function handleFetch() {
    if (!checkUrl(url)) {
      toast({
        variant: "destructive",
        title: "Invalid URL format",
        description:
          "Please use the correct format: https://github.com/{user}/{repo}/tree/{branch}",
        className: cn(
          "top-0 left-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      setUrl("");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${backendUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const response = await res.blob();

      const downloadUrl = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${url.split("/").pop()}.zip`);
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (response) {
        setIsLoading(false);
        toast({
          variant: "default",
          title: "Success!",
          description: `${url.split("/").pop()}.zip downloaded successfully`,
          className: cn("bg-green-400"),
        });
      }
    } catch (err: any) {
      console.log("Error:", err);
      if (err.response && err.response.status === 429) {
        setError("Too many requests. Please calm the fuck down.");
        toast({
          variant: "destructive",
          title: "Too many requests",
          description: "Please calm the fuck down",
        });
      } else {
        ("Error downloading file. Please calm the fuck down.");
        toast({
          variant: "destructive",
          title: "Error downloading file",
          description: "Please calm the fuck down",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCurl() {
    if (!checkUrl(url)) {
      toast({
        variant: "destructive",
        title: "Invalid URL format",
        description:
          "Please use the correct format: https://github.com/{user}/{repo}/tree/{branch}",
        className: cn(
          "top-0 left-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      return;
    }
    const fileName = `${url.split("/").pop()}.zip`;
    const curl = `curl --location '${backendUrl}' \\\n--header 'Content-Type: application/json' \\\n--data '{"url": "${url}"}' \\\n--output ${fileName}`;

    try {
      await navigator.clipboard.writeText(curl);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err: any) {
      console.error("failed to copy curl commands:", err);
    }
  }

  async function handleCopyLink() {
    const comm = `npx easy-ghfetch ${url}`;
    try {
      await navigator.clipboard.writeText(comm);
      setLinkCopied(true);
      toast({
        variant: "default",
        className: cn("bg-green-400"),
        title: "Command Copied",
        description: "npx command copied to clipboard",
      });
      setTimeout(() => setLinkCopied(false), 5000);
    } catch (err: any) {
      console.error("failed to copy node commands:", err);
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center z-10 ">
      <Input
      spellCheck={false}
        type="url"
        placeholder="https://github.com/webbedpiyush/easy-ghcloneWeb/tree/main/client/app"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-white dark:bg-background lg:w-[896.5px]"
      />
      <div className="flex gap-x-2 mt-6">
        <Button
          className="rounded-lg w-[180px] text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3"
          disabled={isLoading}
          onClick={handleFetch}
        >
          {isLoading ? (
            <RotatingLines
              visible={true}
              width="20"
              strokeWidth="3"
              strokeColor="white"
              animationDuration="0.75"
            />
          ) : (
            <div className="flex items-center gap-x-2 justify-center">
              <FiDownload /> Download
            </div>
          )}
        </Button>
        <Button
          className="rounded-lg w-[180px] text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3"
          onClick={handleCurl}
          variant="outline"
        >
          {copied ? (
            <div className="flex justify-center items-center gap-x-2">
              <FiCheck />
              Copied!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-2">
              <FiCopy /> Copy CURL
            </div>
          )}
        </Button>
      </div>
      {showLink && (
        <div className="mt-6 w-full flex justify-center">
          <Button
            className="rounded-lg transition-transform duration-200 text-xs sm:text-sm lg:text-base py-1 sm:py-2 lg:py-3"
            variant="outline"
            onClick={handleCopyLink}
          >
            <div className="flex items-center justify-between w-full gap-x-2 px-1">
              <FiCopy size={16} /> npx easy-ghfetch {trim(url)}
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
