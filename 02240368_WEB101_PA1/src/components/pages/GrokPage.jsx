// GrokPage - AI assistant interface
import { useState } from "react";

export default function GrokPage() {
  const [query, setQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState("Auto");

  return (
    <div style={{ height: "calc(100vh - 53px)", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #e1e8ed"
      }}>
        {/* Left - Grok Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32,
            background: "#000",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: "#fff"
          }}>
            G
          </div>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Grok</span>
        </div>

        {/* Right - History and Private */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            fontSize: 14,
            color: "#000"
          }}>
            <span>📚</span>
            <span>History</span>
          </button>
          <button style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            fontSize: 14,
            color: "#000"
          }}>
            <span>🔒</span>
            <span>Private</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background: "#fff"
      }}>
        {/* Search Bar */}
        <div style={{
          width: "100%",
          maxWidth: 600,
          marginBottom: 24
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "#f7f9fa",
            borderRadius: 24,
            padding: "12px 16px",
            border: "1px solid #e1e8ed"
          }}>
            {/* Attachment Icon */}
            <button style={{
              background: "none",
              border: "none",
              marginRight: 12,
              cursor: "pointer",
              fontSize: 18,
              color: "#536471"
            }}>
              📎
            </button>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Ask anything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 16,
                color: "#000"
              }}
            />

            {/* Mode Selector */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 14,
                color: "#1d9bf0",
                cursor: "pointer",
                marginRight: 12,
                outline: "none"
              }}
            >
              <option value="Auto">Auto</option>
              <option value="Creative">Creative</option>
              <option value="Precise">Precise</option>
            </select>

            {/* Sound Wave Icon */}
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              color: "#536471"
            }}>
              🎙️
            </button>
          </div>
        </div>

        {/* Feature Buttons */}
        <div style={{
          display: "flex",
          gap: 12,
          marginBottom: 48
        }}>
          <button style={{
            background: "#f7f9fa",
            border: "1px solid #e1e8ed",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span>🎨</span>
            <span>Create Images</span>
          </button>
          <button style={{
            background: "#f7f9fa",
            border: "1px solid #e1e8ed",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span>✏️</span>
            <span>Edit Image</span>
          </button>
          <button style={{
            background: "#f7f9fa",
            border: "1px solid #e1e8ed",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <span>📰</span>
            <span>Latest News</span>
          </button>
        </div>

        {/* Example Prompts */}
        <div style={{
          width: "100%",
          maxWidth: 600,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 14, color: "#536471", marginBottom: 16 }}>
            Try asking:
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>
            <button style={{
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "12px 16px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 14,
              color: "#000",
              background: "#f7f9fa",
              transition: "background 0.15s"
            }}
              onMouseEnter={(e) => e.target.style.background = "#e1e8ed"}
              onMouseLeave={(e) => e.target.style.background = "#f7f9fa"}
            >
              "What's the latest news about technology?"
            </button>
            <button style={{
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "12px 16px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 14,
              color: "#000",
              background: "#f7f9fa",
              transition: "background 0.15s"
            }}
              onMouseEnter={(e) => e.target.style.background = "#e1e8ed"}
              onMouseLeave={(e) => e.target.style.background = "#f7f9fa"}
            >
              "Help me write a React component"
            </button>
            <button style={{
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "12px 16px",
              borderRadius: 12,
              cursor: "pointer",
              fontSize: 14,
              color: "#000",
              background: "#f7f9fa",
              transition: "background 0.15s"
            }}
              onMouseEnter={(e) => e.target.style.background = "#e1e8ed"}
              onMouseLeave={(e) => e.target.style.background = "#f7f9fa"}
            >
              "Create an image of a sunset over mountains"
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Right - Customize Grok */}
      <div style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        background: "#f7f9fa",
        border: "1px solid #e1e8ed",
        borderRadius: 16,
        padding: 16,
        width: 280,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          Customize Grok
        </div>
        <div style={{ fontSize: 13, color: "#536471", marginBottom: 12, lineHeight: 1.4 }}>
          Get access to more features on grok.com
        </div>
        <button style={{
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 20,
          padding: "8px 20px",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer"
        }}>
          Explore
        </button>
      </div>
    </div>
  );
}
