import ForumPostsList from "@/components/forum/forumPostsList";
import PostsSort from "@/components/forum/postsSort";
import Search from "@/components/shared/search";
import { getAllPosts } from "@/lib/actions/posts.actions";
import { currentUser } from "@clerk/nextjs";

const Forum = async ({ searchParams }) => {
  const searchParam = searchParams?.search || "";
  const sortOrder = searchParams?.sortOrder || -1;
  const sortField = searchParams?.sortField || "createdAt";

  const user = await currentUser();
  const posts = await getAllPosts({
    searchParam,
    sortOrder,
    sortField,
  });
  return (
    <div className="w-full flex flex-col gap-4 pt-32 px-4 md:px-8 xl:px-12">
      <div className="flex justify-between items-center">
        <h1 className="hidden sm:block text-2xl font-bold">Posts</h1>
        <Search
          path={"forum"}
          search={searchParam}
          field={sortField}
          order={sortOrder}
        />
        <PostsSort search={searchParam} field={sortField} order={sortOrder} />
      </div>
      <ForumPostsList
        initialPosts={posts}
        search={searchParam}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Forum;
