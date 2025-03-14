"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, Send, User } from 'lucide-react';
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import "react-quill/dist/quill.snow.css";
import authService from "services/authService";
import { format } from "date-fns";
import ApiBaseUrl from "api/ApiBaseUrl";

// Dynamic import of react-quill for rich text editing
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function RfqComment({
  rfqId,
  responseId,
}: {
  rfqId: string;
  responseId: string;
}) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };
  const sanitizeMessage = (message) => message.replace(/<\/?[^>]+(>|$)/g, "");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const token = authService.getToken();
  const [hover, setHover] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}rfq-seller-reviews/${rfqId}/${responseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setComments(data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async () => {
    if (!comment.trim()) return;

    try {
      const formData = new FormData();
      formData.append("rfq_id", rfqId);
      formData.append("response_id", responseId);
      formData.append("message_content", comment);
      if (image) formData.append("image", image);
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}rfq-seller-reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rfq_id: rfqId,
            response_id: responseId,
            message_content: comment,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to post comment. Status: ${response.status}, ${errorText}`
        );
        return;
      }

      const data = await response.json();

      if (data.success) {
        setComment("");
        fetchComments();
      } else {
        console.error("Failed to post comment:", data.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    setComment("");
    event.preventDefault();
    postComment();
  };

  useEffect(() => {
    fetchComments();
  }, [rfqId, responseId]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "18px", color: "white" }}>RFQ</span>
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "600",
              margin: 0,
              color: "#E94560",
            }}
          >
            RFQ Comments
          </h1>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>No comments yet. Be the first to post a comment!</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.message_id}
              style={{
                display: "flex",
                gap: "16px",
                backgroundColor: "#f8f9fa",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={() => setHover(c.message_id)}
              onMouseLeave={() => setHover(null)}
            >
              {c.check === 1 && c.image || c.seller_logo ? (
                <Avatar
                  src={c.check === 1 ? c.image : c.seller_logo}
                  alt={c.check === 1 ? c.name : c.shop_name}
                  size={48}
                />
              ) : (
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#E0E0E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <User size={24} color="#757575" />
                </div>
              )}
              <div
                style={{
                  flex: 1,
                  maxWidth: "100%",
                  padding: "16px",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontWeight: "600",
                      marginRight: "8px",
                      color: "#333",
                    }}
                  >
                    {c.check === 1 ? c.name : c.shop_name}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: "14px" }}>
                    {formatDate(c.created_at)}
                  </span>
                </div>
                <div
                  className="responsive-content"
                  style={{
                    lineHeight: "1.6",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                    overflowX: "auto",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: c.message_content }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "32px" }}>
        <div
          style={{
            marginTop: "32px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ReactQuill
            value={comment}
            onChange={setComment}
            style={{
              height: "auto",
              backgroundColor: "#ffffff",
              minHeight: "200px",
            }}
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ script: "sub" }, { script: "super" }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                [{ direction: "rtl" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "font",
              "header",
              "size",
              "color",
              "background",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "script",
              "list",
              "bullet",
              "indent",
              "direction",
              "align",
              "link",
              "image",
              "video",
            ]}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            disabled={!comment.trim()}
            style={{
              margin: "20px 0",
              backgroundColor: !comment.trim() ? "#ccc" : "#E94560",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: !comment.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
          >
            Post Comment
            <Send size={18} />
          </Button>
        </div>
      </form>
      <style jsx global>{`
        .responsive-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 10px 0;
        }
        @media (max-width: 768px) {
          .responsive-content {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
