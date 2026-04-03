// PremiumPage - subscription plans and features
import { useState } from "react";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    period: "/month",
    description: "For individuals who want to stay connected",
    features: [
      "Access to X platform",
      "Post and interact",
      "Basic search",
      "Standard support"
    ],
    buttonText: "Current Plan",
    isCurrent: true,
    popular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: "$8",
    period: "/month",
    description: "For individuals who want to enhance their experience",
    features: [
      "Everything in Basic, plus:",
      "Edit posts",
      "Longer video uploads",
      "Download your data",
      "Reader mode",
      "Priority support"
    ],
    buttonText: "Subscribe",
    isCurrent: false,
    popular: true
  },
  {
    id: "premium-plus",
    name: "Premium+",
    price: "$14",
    period: "/month", 
    description: "For power users who want the best experience",
    features: [
      "Everything in Premium, plus:",
      "Largest video uploads",
      "Full archive of your posts",
      "Top of replies, mentions, searches",
      "Grok access",
      "Blue checkmark"
    ],
    buttonText: "Subscribe",
    isCurrent: false,
    popular: false
  }
];

function PlanCard({ plan, isSelected, onSelect }) {
  return (
    <div
      style={{
        border: isSelected ? "2px solid #1d9bf0" : "1px solid #e1e8ed",
        borderRadius: 16,
        padding: 24,
        background: isSelected ? "#f7f9fa" : "#fff",
        cursor: "pointer",
        transition: "all 0.15s",
        position: "relative"
      }}
      onClick={() => onSelect(plan.id)}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.border = "2px solid #1d9bf0";
          e.currentTarget.style.background = "#f7f9fa";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.border = "1px solid #e1e8ed";
          e.currentTarget.style.background = "#fff";
        }
      }}
    >
      {plan.popular && (
        <div style={{
          position: "absolute",
          top: -12,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1d9bf0",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 700
        }}>
          MOST POPULAR
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{plan.name}</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{plan.price}</span>
          <span style={{ fontSize: 16, color: "#536471" }}>{plan.period}</span>
        </div>
        <div style={{ fontSize: 14, color: "#536471", marginTop: 8 }}>
          {plan.description}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        {plan.features.map((feature, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 12,
            fontSize: 14
          }}>
            <span style={{ color: "#1d9bf0", marginTop: 2 }}>✓</span>
            <span style={{ color: feature.includes("Everything in") ? "#536471" : "#000" }}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 24,
          border: plan.isCurrent ? "1px solid #e1e8ed" : "none",
          background: plan.isCurrent ? "#fff" : "#1d9bf0",
          color: plan.isCurrent ? "#000" : "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: plan.isCurrent ? "default" : "pointer",
          transition: "background 0.15s"
        }}
        disabled={plan.isCurrent}
      >
        {plan.buttonText}
      </button>
    </div>
  );
}

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div style={{ minHeight: "calc(100vh - 53px)", background: "#fff" }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px 32px",
        background: "linear-gradient(180deg, #f7f9fa 0%, #fff 100%)"
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          Choose your Premium plan
        </div>
        <div style={{ fontSize: 16, color: "#536471", maxWidth: 600, margin: "0 auto", lineHeight: 1.5 }}>
          Unlock exclusive features and enhance your X experience with Premium
        </div>
      </div>

      {/* Billing Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        marginBottom: 48
      }}>
        <span style={{ fontSize: 14, color: billingCycle === "monthly" ? "#000" : "#536471" }}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
          style={{
            width: 48,
            height: 24,
            background: billingCycle === "monthly" ? "#1d9bf0" : "#e1e8ed",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            position: "relative",
            transition: "background 0.15s"
          }}
        >
          <div style={{
            position: "absolute",
            top: 2,
            left: billingCycle === "monthly" ? 2 : 22,
            width: 20,
            height: 20,
            background: "#fff",
            borderRadius: "50%",
            transition: "left 0.15s"
          }} />
        </button>
        <span style={{ fontSize: 14, color: billingCycle === "annual" ? "#000" : "#536471" }}>
          Annual (Save 20%)
        </span>
      </div>

      {/* Plans Grid */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 48px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24
      }}>
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
          />
        ))}
      </div>

      {/* Features Comparison */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px 48px"
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
          Compare all features
        </div>
        <div style={{
          background: "#f7f9fa",
          borderRadius: 16,
          padding: 24,
          overflowX: "auto"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px", fontSize: 14, fontWeight: 700 }}>Feature</th>
                <th style={{ textAlign: "center", padding: "12px", fontSize: 14, fontWeight: 700 }}>Basic</th>
                <th style={{ textAlign: "center", padding: "12px", fontSize: 14, fontWeight: 700 }}>Premium</th>
                <th style={{ textAlign: "center", padding: "12px", fontSize: 14, fontWeight: 700 }}>Premium+</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: "1px solid #e1e8ed" }}>
                <td style={{ padding: "12px", fontSize: 14 }}>Post and interact</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
              </tr>
              <tr style={{ borderTop: "1px solid #e1e8ed" }}>
                <td style={{ padding: "12px", fontSize: 14 }}>Edit posts</td>
                <td style={{ textAlign: "center", padding: "12px" }}>-</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
              </tr>
              <tr style={{ borderTop: "1px solid #e1e8ed" }}>
                <td style={{ padding: "12px", fontSize: 14 }}>Grok access</td>
                <td style={{ textAlign: "center", padding: "12px" }}>-</td>
                <td style={{ textAlign: "center", padding: "12px" }}>-</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
              </tr>
              <tr style={{ borderTop: "1px solid #e1e8ed" }}>
                <td style={{ padding: "12px", fontSize: 14 }}>Blue checkmark</td>
                <td style={{ textAlign: "center", padding: "12px" }}>-</td>
                <td style={{ textAlign: "center", padding: "12px" }}>-</td>
                <td style={{ textAlign: "center", padding: "12px" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "0 24px 48px"
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
          Frequently Asked Questions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            background: "#f7f9fa",
            borderRadius: 12,
            padding: 16
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              Can I change my plan anytime?
            </div>
            <div style={{ fontSize: 14, color: "#536471", lineHeight: 1.5 }}>
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </div>
          </div>
          <div style={{
            background: "#f7f9fa",
            borderRadius: 12,
            padding: 16
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              What payment methods do you accept?
            </div>
            <div style={{ fontSize: 14, color: "#536471", lineHeight: 1.5 }}>
              We accept all major credit cards, debit cards, and PayPal for Premium subscriptions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
