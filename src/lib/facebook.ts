import type React from "react";
import { FACEBOOK_GROUP_URL } from "./constants";

interface FacebookNavigationCallbacks {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export const handleFacebookGroupNavigation = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  callbacks?: FacebookNavigationCallbacks
) => {
  if (event.defaultPrevented) {
    callbacks?.onFailure?.();
    return;
  }

  // Keep native anchor navigation. A trusted new-tab anchor click is more
  // reliable than window.open(), and the link's rel protection keeps the
  // opener without making a successful navigation look like a blocked popup.
  callbacks?.onSuccess?.();
};

export { FACEBOOK_GROUP_URL };
