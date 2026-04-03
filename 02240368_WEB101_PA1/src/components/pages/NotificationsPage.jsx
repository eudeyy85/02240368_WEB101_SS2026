// NotificationsPage - shows user notifications
export default function NotificationsPage() {
  return (
    <div style={{ padding: 32, textAlign: "center", color: "#71767b", marginTop: 48 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
      <div style={{
        fontSize: 31,
        fontWeight: 700,
        color: "#000",
        marginBottom: 8
      }}>
        Nothing to see here — yet
      </div>
      <div style={{ fontSize: 15, maxWidth: 360, margin: "0 auto", lineHeight: 1.5 }}>
        From likes to reposts and a whole lot more,
        this is where all the action happens.
      </div>
    </div>
  );
}
