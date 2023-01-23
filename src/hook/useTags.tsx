import { useState, useCallback } from "react";

export const useTags = () => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([
    "Thỏ",
    "Bèo",
    "Lá",
    "Dóe",
    "Lông",
    "Trang",
  ] as string[]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onTagKeyDown = useCallback(
    (e: any) => {
      const { key } = e;
      const trimmedInput = tagInput.trim();

      if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags((prevState) => [...prevState, trimmedInput]);
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

  const onTagChange = useCallback((e: any) => {
    const { value } = e.target;
    setTagInput(value);
  }, []);

  const onTagKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return {
    tags,
    tagInput,
    onTagKeyUp,
    onTagChange,
    onTagKeyDown,
    deleteTag,
  };
};
