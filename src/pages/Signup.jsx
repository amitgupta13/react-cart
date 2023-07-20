import Input from "../components/ui/Input";
import { useState } from "react";

const data = [
  { name: "Ram" },
  { name: "Test1" },
  { name: "React" },
  { name: "Node" },
  { name: "Bold" },
];

export default function Signup() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue((_) => {
      const suggestions = data.filter((item) => {
        return e.target.value
          .split("")
          .every((i) => item.name.split("").includes(i));
      });

      console.log(suggestions);
      return e.target.value;
    });
  };

  return (
    <div>
      <Input value={value} onChange={handleChange} />
    </div>
  );
}
