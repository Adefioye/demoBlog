import Editor from "@/components/editor";
import { NextPage } from "next";

interface Props {}

const create: NextPage<Props> = () => {
  return (
    <div className="flex items-center justify-center">
      <Editor />
    </div>
  );
};

export default create;
