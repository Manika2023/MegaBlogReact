// useCallback hook is used to memoize functions.-> no need to re- calculate
// Memoizing a function means caching the result of a function call
// so that it can be reused without recalculating it when the same inputs occur

import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        status: "active",
      },
    });

  // Populate the form when `post` prop is provided
  React.useEffect(() => {
    if (post) {
      setValue("title", post.title || "");
      setValue("slug", post.$id || "");
      setValue("content", post.content || "");
      // setValue("content", post.content || "");
      setValue("status", post.status || "active");
    }
  }, [post, setValue]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
  console.log("user data is", userData);

  const submit = async (data) => {
    if (post) {
      // get the new file to update
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      // delete old one file
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // update the post
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    // user is giving new post
    else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        console.log("here file id in post form is: ",fileId);
        // give file id of featured image
        data.featuredImage = fileId;
        // send all data
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  //  watch title and generate slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    // to memory management-> to optimization
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title:"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
          //  defaultValue={post?.content || ""} // Safeguard against undefined
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png , image/jpg, image/jpeg, image/gif"
          // no post without image
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
