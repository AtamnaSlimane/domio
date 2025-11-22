import Actions from "./Actions";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 flex w-full items-center justify-center sm:px-20 lg:px-10">
      <div className="flex items-center justify-between max-w-7xl w-full gap-10 lg:gap-20 xl:gap-30 p-4">
        <Logo />
        {/* <SearchBar /> */}
        <Actions />
      </div>
    </div>
  );
};

export default Navbar;
