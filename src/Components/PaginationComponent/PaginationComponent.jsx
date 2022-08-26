import Button from "../ButtonComponent/ButtonComponent";
const PaginationComponent = ({ changePage, page, modifiers }) => {
  const defaultStyle =
    "absolute bottom-0 flex flex-row text-white align-middle justify-evenly w-sreen  mb-4 ";
  return (
    <div className={`${defaultStyle} ${modifiers}`}>
      <Button modifiers="w-[150px]" type="secondary" callback={changePage}>
        Previous
      </Button>
      <span className="h-10 px-2 text-3xl font-bold rounded-full w-30">
        {page + 1}
      </span>
      <Button modifiers="w-[150px]" type="primary" callback={changePage}>
        Next
      </Button>
    </div>
  );
};
export default PaginationComponent;
