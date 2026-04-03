// LoginPage - Twitter-style login page
import { useState } from "react";
import { XLogo } from "../../App.jsx";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, name: "Tshering Euden" });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      fontFamily: '"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "320px"
      }}>
        {/* X Logo */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px"
        }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#1d9bf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}>
            <XLogo />
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <h1 style={{
            fontSize: "31px",
            fontWeight: "700",
            color: "#000000",
            marginBottom: "32px",
            lineHeight: "1.2"
          }}>
            Sign in to X
          </h1>

          {/* Email Input */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Phone, email, or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "transparent",
                border: "1px solid #e1e8ed",
                borderRadius: "4px",
                color: "#000000",
                fontSize: "17px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1d9bf0"}
              onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  paddingRight: "40px",
                  backgroundColor: "transparent",
                  border: "1px solid #e1e8ed",
                  borderRadius: "4px",
                  color: "#000000",
                  fontSize: "17px",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#1d9bf0"}
                onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  color: "#536471",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div style={{ marginBottom: "24px" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#1d9bf0",
                fontSize: "15px",
                cursor: "pointer",
                padding: 0,
                textDecoration: "none"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={!email || !password}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: email && password ? "#000000" : "#e1e8ed",
              border: "1px solid #e1e8ed",
              borderRadius: "9999px",
              color: email && password ? "#ffffff" : "#536471",
              fontSize: "17px",
              fontWeight: "700",
              cursor: email && password ? "pointer" : "not-allowed",
              transition: "background-color 0.2s, border-color 0.2s",
              marginBottom: "24px"
            }}
          >
            Sign in
          </button>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px"
          }}>
            <div style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#e1e8ed"
            }} />
            <span style={{
              padding: "0 16px",
              color: "#536471",
              fontSize: "15px"
            }}>
              or
            </span>
            <div style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#e1e8ed"
            }} />
          </div>

          {/* Sign Up Options */}
          <div style={{ marginBottom: "24px" }}>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "transparent",
                border: "1px solid #e1e8ed",
                borderRadius: "9999px",
                color: "#000000",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "border-color 0.2s",
                marginBottom: "12px"
              }}
              onMouseOver={(e) => e.target.style.borderColor = "#536471"}
              onMouseOut={(e) => e.target.style.borderColor = "#e1e8ed"}
            >
              Sign up with phone, email, or username
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div style={{
          textAlign: "center",
          color: "#536471",
          fontSize: "15px"
        }}>
          Don't have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#1d9bf0",
              fontSize: "15px",
              cursor: "pointer",
              padding: 0,
              textDecoration: "none"
            }}
            onMouseOver={(e) => e.target.style.textDecoration = "underline"}
            onMouseOut={(e) => e.target.style.textDecoration = "none"}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
