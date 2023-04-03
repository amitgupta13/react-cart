import { useRef, useState, useEffect } from "react";

export function useNavSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!elementRef.current) {
        return;
      }

      if (!elementRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return {
    toggleDropdown,
    elementRef,
    isOpen,
    setIsOpen,
  };
}
