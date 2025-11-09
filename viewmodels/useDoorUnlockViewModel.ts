"use client";

import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { DoorModel } from "@/models/door";

export const useDoorUnlockViewModel = (door: DoorModel) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (password.trim().toLowerCase() !== door.password.toLowerCase()) {
        setError("Fel lösenord. Försök igen.");
        return;
      }

      router.push(`/door/${door.id}/${door.gameSlug}`);
    },
    [door.id, door.password, door.gameSlug, password, router]
  );

  return {
    password,
    error,
    handlePasswordChange,
    handleSubmit,
  };
};

