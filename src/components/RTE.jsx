import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const MyRTEkEY = "0gjjm7w7k7nk0k66p7fwmt1sr7kpkk0p64nsl2zm22l55tqk"; // Use environment variable for the API key

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [content, setContent] = useState(defaultValue); // Local state for content

  useEffect(() => {
    setContent(defaultValue); // Update local state when defaultValue changes
  }, [defaultValue]);

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={MyRTEkEY}
            value={content} // Use dynamic value for editor
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newContent) => {
              setContent(newContent); // Update local state
              onChange(newContent); // Update the form control
            }}
          />
        )}
      />
    </div>
  );
}
