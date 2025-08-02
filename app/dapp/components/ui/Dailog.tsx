"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface DialogBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: "max-w-sm min-w-[18rem] p-6",
  md: "max-w-md min-w-[22rem] p-8",
  lg: "max-w-lg min-w-[28rem] p-10",
  xl: "max-w-xl min-w-[34rem] p-12",
};

export const DialogBase = ({
  isOpen,
  onClose,
  children,
  size = "md",
  className = "",
}: DialogBaseProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none rounded-2xl bg-background border border-primary-border ${SIZE_MAP[size]} ${className}`}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
