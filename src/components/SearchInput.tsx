import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import type { ChangeEvent } from "react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
};

const SearchInput = ({ onChange }: Props) => {
  return (
    <InputGroup className="mt-6 py-5 mb-8 w-full md:w-[70%]  focus-within:border-primary! focus-within:ring-primary/50!">
      <InputGroupInput
        onChange={(event) => onChange(event)}
        placeholder="Search..."
      />
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
