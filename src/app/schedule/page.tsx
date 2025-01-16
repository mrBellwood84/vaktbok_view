import { DataLoadbar, DataLoadbarFailed } from "@/component/Loadbar";

const Page = () => {
  return (
    <div>
      <DataLoadbar />
      <DataLoadbarFailed />
    </div>
  );
};

export default Page;
