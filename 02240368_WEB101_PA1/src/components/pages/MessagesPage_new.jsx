// MessagesPage - direct messages with chat interface
import { useState } from "react";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Victor Okafor",
    handle: "TheVictorOkafor",
    avatar: "VO",
    avatarColor: "#8B4513",
    lastMessage: "Hey, how's the project going?",
    time: "2h",
    unread: 2
  },
  {
    id: 2,
    name: "React Dev",
    handle: "ReactDevDaily",
    avatar: "RD",
    avatarColor: "#61dafb",
    lastMessage: "Thanks for sharing the article!",
    time: "5h",
    unread: 0
  }
];

function ConversationItem({ conversation, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        padding: "12px 16px",
        cursor: "pointer",
        borderBottom: "1px solid #e1e8ed",
        background: isSelected ? "#f7f9fa" : "transparent",
        transition: "background 0.15s"
      }}
      onMouseEnter={e => e.currentTarget.style.background = isSelected ? "#f7f9fa" : "#f8f8f8"}
      onMouseLeave={e => e.currentTarget.style.background = isSelected ? "#f7f9fa" : "transparent"}
    >
      {/* Avatar */}
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: conversation.avatarColor, flexShrink: 0,
        display: "flex", alignItems: "center",
        justifyContent: "center",
        fontSize: 14, fontWeight: 700, color: "#fff",
        marginRight: 12
      }}>
        {conversation.avatar}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{conversation.name}</span>
          <span style={{ fontSize: 13, color: "#536471" }}>{conversation.time}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, color: "#536471", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {conversation.lastMessage}
          </span>
          {conversation.unread > 0 && (
            <span style={{
              background: "#1d9bf0",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 9999,
              padding: "2px 6px",
              minWidth: 20,
              textAlign: "center",
              marginLeft: 8
            }}>
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredConversations = CONVERSATIONS.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "calc(100vh - 53px)" }}>
      {/* Left Sidebar - Conversations List */}
      <div style={{
        width: 350,
        borderRight: "1px solid #e1e8ed",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e1e8ed" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Chat</div>
          
          {/* Search and Filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#f7f9fa",
              borderRadius: 9999,
              padding: "8px 12px"
            }}>
              <span style={{ color: "#536471", marginRight: 8 }}>🔍</span>
              <input
                type="text"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14,
                  color: "#000",
                  width: "100%"
                }}
              />
            </div>
            
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                background: "#f7f9fa",
                border: "1px solid #e1e8ed",
                borderRadius: 9999,
                padding: "8px 12px",
                fontSize: 14,
                color: "#000",
                cursor: "pointer"
              }}
            >
              <option value="All">All</option>
              <option value="Unread">Unread</option>
              <option value="Groups">Groups</option>
            </select>
            
            {/* Refresh Button */}
            <button
              style={{
                background: "#f7f9fa",
                border: "1px solid #e1e8ed",
                borderRadius: 9999,
                padding: "8px 12px",
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              🔄
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conv => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isSelected={selectedConversation?.id === conv.id}
                onClick={() => setSelectedConversation(conv)}
              />
            ))
          ) : (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 16px",
              textAlign: "center",
              color: "#536471"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 8 }}>
                Empty inbox
              </div>
              <div style={{ fontSize: 14 }}>
                Message someone
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - Chat Window */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#fff"
      }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #e1e8ed",
              background: "#fff"
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: selectedConversation.avatarColor,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#fff",
                marginRight: 12
              }}>
                {selectedConversation.avatar}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{selectedConversation.name}</div>
                <div style={{ fontSize: 13, color: "#536471" }}>@{selectedConversation.handle}</div>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#536471"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 8 }}>
                Start Conversation
              </div>
              <div style={{ fontSize: 14, textAlign: "center", maxWidth: 300 }}>
                Choose from your existing conversations, or start a new one.
              </div>
            </div>

            {/* Message Input */}
            <div style={{
              padding: "12px 16px",
              borderTop: "1px solid #e1e8ed",
              background: "#fff"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <input
                  type="text"
                  placeholder="Start a new message"
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #e1e8ed",
                    borderRadius: 9999,
                    fontSize: 14,
                    outline: "none"
                  }}
                />
                <button
                  style={{
                    background: "#1d9bf0",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9999,
                    padding: "8px 16px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#536471"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 8 }}>
              Start Conversation
            </div>
            <div style={{ fontSize: 14, textAlign: "center", maxWidth: 300, marginBottom: 24 }}>
              Choose from your existing conversations, or start a new one.
            </div>
            <button
              style={{
                background: "#1d9bf0",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              New chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
