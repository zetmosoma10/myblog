import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const SearchInput = () => {
  return (
    <InputGroup className="mt-6 py-5 mb-8 w-full md:w-[70%]  focus-within:border-primary! focus-within:ring-primary/50!">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
