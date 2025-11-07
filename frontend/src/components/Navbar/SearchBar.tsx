import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="flex lg:flex w-full h-14 items-center justify-center">
      <ButtonGroup className="w-full h-full">
        <Input
          type="text"
          className="w-full h-full"
          placeholder="Hotel, London ..."
        />
        <Button className="h-full" size={"lg"}>
          Search
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SearchBar;
