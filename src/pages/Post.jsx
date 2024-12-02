import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-400">
            <Container>
                <div className="relative border rounded-xl p-4 flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Action Buttons */}
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Image Section */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                        <div className="text-gray-800">{parse(post.content)}</div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
