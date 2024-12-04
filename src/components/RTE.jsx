import React,{useEffect,useState} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

const MyRTEkEY="0gjjm7w7k7nk0k66p7fwmt1sr7kpkk0p64nsl2zm22l55tqk"

// control-> component se form me le jane ke liye
export default function RTE({name,control,label, defaultValue=""}) {
  return (
    <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1'>
     {label}
     </label>}

     <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange,value}}) => (
     // jo bhi field lana hai like editor and input
        <Editor
        apiKey = {MyRTEkEY}
        initialValue={defaultValue}
        value={value} // Use dynamic value
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={(newValue) => {
          onChange(newValue)
          console.log("new value is: ",newValue);
        }
        } // Update React Hook Form
        // it will not work in development environment
        // onEditorChange={onChange}
        />
    )}
    />

    </div>
  )
}