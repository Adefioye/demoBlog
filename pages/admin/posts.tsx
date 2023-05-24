import AdminLayout from "@/components/common/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Posts: NextPage<Props> = () => {
  return (
    <div>
      <AdminLayout>Posts</AdminLayout>
    </div>
  );
};

export default Posts;
