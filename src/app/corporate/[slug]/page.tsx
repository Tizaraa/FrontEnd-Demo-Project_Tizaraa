"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import Link from "next/link";
import CommonHeader from "@component/header/CommonHeader";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";

interface CreditInfo {
  credit_limit: number;
  credit_used: number;
  credit_available: number;
  status: string;
  company_name: string;
  department?: string;
  designation?: string;
}

interface Order {
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
}

export default function CorporateDashboard({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const router = useRouter();

  const [credit, setCredit] = useState<CreditInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingCredit, setLoadingCredit] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Fetch credit info
    axios
      .get(`${ApiBaseUrl.localApiUrl}corporate/${slug}/credit`, { headers })
      .then((res) => setCredit(res.data?.data))
      .catch((err) => {
        const msg = err.response?.data?.message;
        if (err.response?.status === 403) {
          toast.error("Access denied. Your account may still be pending approval.");
        } else {
          toast.error(msg || "Failed to load corporate info.");
        }
      })
      .finally(() => setLoadingCredit(false));

    // Fetch orders
    axios
      .get(`${ApiBaseUrl.localApiUrl}corporate/${slug}/orders`, { headers })
      .then((res) => setOrders(res.data?.data || []))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [slug, router]);

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      active: "#22c55e",
      pending: "#f59e0b",
      suspended: "#ef4444",
    };
    return map[status] || "#6b7280";
  };

  const orderStatusColor = (status: string) => {
    const map: Record<string, string> = {
      delivered: "#22c55e",
      processing: "#3b82f6",
      pending: "#f59e0b",
      cancelled: "#ef4444",
    };
    return map[status?.toLowerCase()] || "#6b7280";
  };

  return (
    <>
      <CommonHeader />
      <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1rem", fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            {loadingCredit ? "Loading..." : credit?.company_name ?? "Corporate Dashboard"}
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.25rem" }}>Your corporate store portal</p>
        </div>

        {/* Credit Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            borderRadius: 16,
            padding: "2rem",
            color: "#fff",
            marginBottom: "2rem",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
          }}
        >
          {loadingCredit ? (
            <div style={{ textAlign: "center" }}>
              <BeatLoader color="#fff" size={10} />
            </div>
          ) : credit ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
              <div>
                <p style={{ margin: 0, opacity: 0.75, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Credit Limit</p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "1.75rem", fontWeight: 700 }}>
                  ৳{Number(credit.credit_limit).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, opacity: 0.75, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Used</p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "1.75rem", fontWeight: 700 }}>
                  ৳{Number(credit.credit_used).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, opacity: 0.75, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Available</p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "1.75rem", fontWeight: 700 }}>
                  ৳{Number(credit.credit_available).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, opacity: 0.75, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Account Status</p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.4rem",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 20,
                    padding: "0.25rem 0.85rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {credit.status}
                </span>
              </div>
            </div>
          ) : (
            <p style={{ margin: 0, opacity: 0.8 }}>Unable to load credit information.</p>
          )}
        </div>

        {/* Pending notice */}
        {!loadingCredit && credit?.status === "pending" && (
          <div
            style={{
              background: "#fefce8",
              border: "1px solid #fde047",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              marginBottom: "2rem",
              color: "#713f12",
            }}
          >
            ⏳ Your account is <strong>pending approval</strong> from the corporate admin. You'll gain full access once approved.
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Shop Products", href: "/b2b-products", icon: "🛍️" },
            { label: "My Orders", href: `/corporate/${slug}/orders`, icon: "📦" },
            { label: "Billing", href: `/corporate/${slug}/billing`, icon: "💳" },
          ].map((action) => (
            <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "1.25rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)")}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{action.icon}</div>
                <p style={{ margin: 0, fontWeight: 600, color: "#1e293b", fontSize: "0.9rem" }}>{action.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "1.5rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginTop: 0, marginBottom: "1.25rem" }}>
            Recent Orders
          </h2>

          {loadingOrders ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <BeatLoader color="#3b82f6" size={10} />
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📋</div>
              <p style={{ margin: 0 }}>No orders yet. Start shopping!</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Order #", "Date", "Status", "Total"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.75rem", color: "#64748b", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.order_number} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "0.75rem", fontSize: "0.9rem", fontWeight: 600, color: "#3b82f6" }}>
                      #{order.order_number}
                    </td>
                    <td style={{ padding: "0.75rem", fontSize: "0.85rem", color: "#64748b" }}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <span
                        style={{
                          background: orderStatusColor(order.status) + "20",
                          color: orderStatusColor(order.status),
                          borderRadius: 20,
                          padding: "0.2rem 0.75rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem", fontSize: "0.9rem", fontWeight: 600, color: "#1e293b" }}>
                      ৳{Number(order.total_amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
