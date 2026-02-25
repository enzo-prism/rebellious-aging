import type React from "react";
import { toast } from "@/components/ui/sonner";
import { FACEBOOK_GROUP_URL } from "./constants";

const copyFacebookGroupLink = async () => {
  try {
    await navigator.clipboard.writeText(FACEBOOK_GROUP_URL);
    toast.success("Link copied to clipboard");
  } catch {
    window.prompt("Copy this link", FACEBOOK_GROUP_URL);
  }
};

export const openFacebookGroup = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const newWindow = window.open(
    FACEBOOK_GROUP_URL,
    "_blank",
    "noopener,noreferrer"
  );

  if (newWindow) {
    newWindow.opener = null;
    return true;
  }

  try {
    if (window.top && window.top !== window) {
      window.top.location.href = FACEBOOK_GROUP_URL;
      return true;
    }
  } catch {
    // Ignore cross-origin access errors.
  }

  return false;
};

interface FacebookNavigationCallbacks {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export const handleFacebookGroupNavigation = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  callbacks?: FacebookNavigationCallbacks
) => {
  event.preventDefault();

  const opened = openFacebookGroup();

  if (opened) {
    callbacks?.onSuccess?.();
    return;
  }

  callbacks?.onFailure?.();

  toast.error("Unable to open Facebook", {
    description: "Copy the link below and open it in a new tab.",
    action: {
      label: "Copy link",
      onClick: copyFacebookGroupLink,
    },
    duration: 8000,
  });
};

export { FACEBOOK_GROUP_URL };
