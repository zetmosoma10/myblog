import { Link } from "@tanstack/react-router";

const BackLink = () => {
  return (
    <div className="mb-6">
      <Link
        to=".."
        className=" text-muted-foreground  hover:text-white transition-all duration-75 w text-base focus:underline focus:outline-0"
      >
        {"<- "}
        Back to post{" "}
      </Link>
    </div>
  );
};

export default BackLink;
