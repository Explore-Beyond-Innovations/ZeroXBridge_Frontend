"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useMemo } from "react";
import { useThemeContext } from "@/app/hooks/context";
import { Close } from "@/svg/CloseIcon";

interface DialogBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  title?: string;
  /* helps you decided whether to give the modal a close button or not */
  addCloseBtn?: boolean;
}

const SIZE_MAP = {
  sm: "w-[90%] max-w-sm sm:min-w-[18rem]",
  md: "w-[90%] max-w-md sm:min-w-[22rem]",
  lg: "w-[90%] max-w-lg sm:min-w-[28rem]",
  xl: "w-[90%] max-w-xl sm:min-w-[34rem]",
};

export const DialogBase = ({
  isOpen,
  onClose,
  children,
  size = "md",
  className = "",
  title,
  addCloseBtn,
}: DialogBaseProps) => {
  const { theme } = useThemeContext();
  const isDark = useMemo(() => theme === "dark", [theme]);
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-50 ${
            isDark ? "bg-black/30" : "bg-[#F0F0F0]/30"
          } backdrop-blur-[8px]`}
        />
        <Dialog.Content
          className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none rounded-2xl bg-background border border-primary-border ${SIZE_MAP[size]} ${className}`}
        >
          {addCloseBtn && (
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className={`absolute flex justify-center items-center border dark:border-[var(--close-btn-border)] border-[var(--wallet-border)] rounded-full h-8 w-8 top-2 right-2 text-2xl leading-none text-sidebar-text`}
              >
                <Close />
              </button>
            </Dialog.Close>
          )}
          {title && (
            <Dialog.Title className="border-b border-[#F5F5F5] dark:border-[#444444] pb-3">
              {title}
            </Dialog.Title>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
