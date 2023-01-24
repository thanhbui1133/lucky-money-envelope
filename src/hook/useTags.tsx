import { loadState } from "@/utils";
import { useState, useCallback, useEffect } from "react";

export const useTags = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  useEffect(() => {
    const loadedState = loadState("_form");
    const tags = loadedState?.tags || [
      "Thỏ",
      "Bèo",
      "Lá",
      "Dóe",
      "Lông",
      "Trang",
    ];
    setTags(tags);
  }, []);

  const onTagKeyDown = useCallback(
    (e: any) => {
      const { key } = e;
      const trimmedInput = tagInput.trim();

      if (
        key === "Enter" &&
        trimmedInput.length &&
        !tags.includes(trimmedInput)
      ) {
        e.preventDefault();
        setTags((prevState) => [...prevState, trimmedInput]);
        const loadedState = loadState("_form");
        const formData = {
          ...loadedState,
          tags: [...tags, trimmedInput],
        };
        localStorage.setItem("_form", JSON.stringify(formData));
        setTagInput("");
      }

      if (
        key === "Backspace" &&
        !tagInput.length &&
        tags.length &&
        isKeyReleased
      ) {
        e.preventDefault();
        const tagsCopy = [...tags];
        const poppedTag = tagsCopy.pop();

        setTags(tagsCopy);
        setTagInput(poppedTag || "");
      }
      setIsKeyReleased(false);
    },
    [isKeyReleased, tagInput, tags]
  );

  const onTagChange = useCallback(
    (e: any) => {
      const { value } = e.target;
      if (value[value.length - 1] === ",") {
        const trimmedValue = value.trim().slice(0, -1);
        if (trimmedValue.length && !tags.includes(trimmedValue)) {
          setTags((prevState) => [...prevState, trimmedValue]);
          const loadedState = loadState("_form");
          const formData = {
            ...loadedState,
            tags: [...tags, trimmedValue],
          };
          localStorage.setItem("_form", JSON.stringify(formData));
          setTagInput("");
        }
      } else {
        setTagInput(value);
      }
    },
    [tags]
  );

  const onTagKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = useCallback(
    (index: number) => {
      setTags((prevState) => prevState.filter((tag, i) => i !== index));
      const loadedState = loadState("_form");
      const formData = {
        ...loadedState,
        tags: tags.filter((tag, i) => i !== index),
      };
      localStorage.setItem("_form", JSON.stringify(formData));
    },
    [tags]
  );

  return {
    tags,
    tagInput,
    onTagKeyUp,
    onTagChange,
    onTagKeyDown,
    deleteTag,
  };
};
