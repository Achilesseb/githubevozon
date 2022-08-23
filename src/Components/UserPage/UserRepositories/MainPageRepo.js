import Branches from "./Branches";
import LanguageUsed from "./LanguageUsed";

const MainPaigRepo = () => {
  return (
    <>
      <div className="flex flex-col justify-center gap-8 md:gap-0 w-full h-auto">
        <LanguageUsed />
        <Branches />
      </div>
    </>
  );
};

export default MainPaigRepo;
