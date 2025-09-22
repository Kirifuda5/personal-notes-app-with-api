import { useState, useCallback } from "react";

export default function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback((e) => setValue(e.target.value), []);
  return [value, onChange, setValue];
}
