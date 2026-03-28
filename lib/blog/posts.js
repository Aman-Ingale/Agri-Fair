const POSTS = [
  {
    slug: "how-fair-bidding-works",
    title: "How Fair Bidding Works on AgriFair",
    excerpt:
      "A simple guide to placing fair bids, what “pending/accepted/ordered” means, and how farmers and buyers coordinate smoothly.",
    date: "2026-03-01",
    readTime: "6 min read",
    tags: ["Bidding", "Buyers", "Farmers"],
    seo: {
      keywords: ["fair bidding", "agri marketplace", "farmers and buyers", "crop bids"],
      summary:
        "Learn how AgriFair’s fair bidding process works end-to-end: listing discovery, bid placement, farmer acceptance, and order coordination.",
    },
    content: [
      {
        type: "h2",
        text: "The AgriFair flow (step by step)",
      },
      {
        type: "p",
        text: "AgriFair connects farmers and buyers without confusing negotiations. You browse listings, place a bid with your quantity and price, the farmer reviews the bid, and once accepted the transaction moves into ordering and delivery coordination.",
      },
      { type: "h3", text: "1) Browse listings" },
      {
        type: "p",
        text: "Listings show the crop, variety, grade, available quantity, price per unit, and harvest date. Use filters to narrow down by crop, variety, location, and grade.",
      },
      { type: "h3", text: "2) Place a bid" },
      {
        type: "p",
        text: "After selecting a listing, enter the quantity you want and your bid price per unit. Submit the bid to your selected farmer for that crop.",
      },
      { type: "h3", text: "3) Status meanings" },
      {
        type: "ul",
        items: [
          "pending: The farmer hasn’t accepted or rejected the bid yet.",
          "accepted: The farmer accepted your bid and the order can proceed.",
          "ordered: The order has been created and the process is moving forward.",
          "rejected: The farmer didn’t accept this bid (you can place another bid).",
        ],
      },
      { type: "h2", text: "Tips for placing fair bids" },
      {
        type: "ul",
        items: [
          "Start with a bid that matches the grade and available quantity shown on the listing.",
          "Review the harvest date so you can plan delivery timing.",
          "Bid with realistic quantity—avoid bids that exceed the available quantity.",
        ],
      },
      { type: "h2", text: "Want the quickest start?" },
      {
        type: "p",
        text: "Go to Listings, choose a crop, and place your first bid. If you’re a farmer, head to Add Listing to publish your produce and receive bids from buyers.",
      },
    ],
  },
  {
    slug: "buyer-checklist-before-you-bid",
    title: "Buyer Checklist Before You Bid",
    excerpt:
      "Before you place a bid, confirm quantity, grade, harvest date, and the listing details so the order runs smoothly.",
    date: "2026-03-02",
    readTime: "5 min read",
    tags: ["Buyers", "Quality", "Practical Tips"],
    seo: {
      keywords: ["buyer checklist", "crop quality", "bid quantity", "harvest date"],
      summary:
        "Use this checklist to verify crop grade, quantity, price, and harvest timing before placing a bid on AgriFair.",
    },
    content: [
      { type: "h2", text: "Why buyers should verify details" },
      {
        type: "p",
        text: "Fair bidding is only fair if the listing details are clear and the bid matches what’s actually available. A quick verification step prevents mismatches later during ordering.",
      },
      { type: "h2", text: "Checklist (in order)" },
      {
        type: "ol",
        items: [
          "Confirm crop + variety so you’re buying what you intend to use.",
          "Check grade: higher grade often justifies a better price.",
          "Validate available quantity: your bid quantity should fit within the listing’s available amount.",
          "Review price per unit: ensure your bid price aligns with your budget and the grade.",
          "Check harvest date: plan delivery timelines from the harvest date.",
          "Double-check location: logistics are smoother when location is correct.",
        ],
      },
      { type: "h2", text: "After your bid is accepted" },
      {
        type: "p",
        text: "Once accepted, your bid moves forward so you can place the order. Keep an eye on bid status to know when action is needed.",
      },
    ],
  },
  {
    slug: "farmer-guide-to-get-more-bids",
    title: "Farmer Guide: Get More Bids on Your Listings",
    excerpt:
      "Learn how to write strong listings, choose competitive prices, and reduce friction so buyers trust and bid on your produce.",
    date: "2026-03-03",
    readTime: "7 min read",
    tags: ["Farmers", "Listings", "Growth"],
    seo: {
      keywords: ["farmers", "add listing", "get bids", "competitive pricing", "harvest date"],
      summary:
        "A practical guide for farmers to improve listing quality, reduce uncertainty, and attract more buyer bids on AgriFair.",
    },
    content: [
      { type: "h2", text: "What buyers look for" },
      {
        type: "p",
        text: "Buyers bid when they understand the product clearly. The listing should make it easy to compare quality, price, and availability.",
      },
      { type: "h2", text: "Create a high-trust listing" },
      {
        type: "ul",
        items: [
          "Use a clear title and accurate crop + variety selection.",
          "Pick the correct grade and ensure it matches your produce quality.",
          "Set total quantity and available quantity honestly (don’t overpromise).",
          "Add a realistic harvest date so buyers can plan ordering.",
          "Use a fair price per unit that reflects grade and quantity.",
          "Provide an easy-to-understand location field.",
        ],
      },
      { type: "h2", text: "How fair bidding helps you" },
      {
        type: "p",
        text: "AgriFair supports a transparent process: buyers submit bids, and you accept or reject. That means you can optimize your price without endless negotiation.",
      },
      { type: "h2", text: "Next step" },
      {
        type: "p",
        text: "Go to Add Listing and publish your produce. The better your listing quality, the more likely buyers will place bids.",
      },
    ],
  },
  {
    slug: "reducing-price-uncertainty",
    title: "Reducing Price Uncertainty for Farmers and Buyers",
    excerpt:
      "Fair bidding reduces uncertainty by letting each side respond with a clear offer—before orders are created.",
    date: "2026-03-04",
    readTime: "6 min read",
    tags: ["Fairness", "Bidding", "Marketplace"],
    seo: {
      keywords: ["price uncertainty", "fair bidding", "marketplace fairness", "order coordination"],
      summary:
        "How transparent bid status and clear listing details help reduce uncertainty for both farmers and buyers.",
    },
    content: [
      { type: "h2", text: "The real problem: ambiguity" },
      {
        type: "p",
        text: "Traditional procurement can have a lot of ambiguity. Buyers may not know what price is acceptable, and farmers may not know what quantity or price buyers are targeting.",
      },
      { type: "h2", text: "How bids solve it" },
      {
        type: "p",
        text: "AgriFair turns procurement into structured offers. You see a bid with quantity and price. The farmer can accept if it’s fair, or reject if the offer doesn’t match quality or availability.",
      },
      { type: "h2", text: "Transparent status makes next steps easier" },
      {
        type: "ul",
        items: [
          "Pending: time for decisions without creating orders too early.",
          "Accepted: the process is ready to move to ordering.",
          "Ordered: the order exists and both sides can coordinate smoothly.",
        ],
      },
    ],
  },
  {
    slug: "agri-marketplace-101-agrifair-edition",
    title: "Agri Marketplace 101 (AgriFair Edition)",
    excerpt:
      "New to online crop buying? This guide explains listings, bids, and how buyers and farmers coordinate in AgriFair.",
    date: "2026-03-05",
    readTime: "6 min read",
    tags: ["Beginner", "AgriFair"],
    seo: {
      keywords: ["agri marketplace", "crop listings", "bids", "buyers", "farmers"],
      summary:
        "A beginner-friendly introduction to AgriFair: how listings, bids, and accepted offers lead to orders.",
    },
    content: [
      { type: "h2", text: "What is a listing?" },
      {
        type: "p",
        text: "A listing is a published offer by a farmer. It includes crop information, variety, grade, available quantity, and a price per unit.",
      },
      { type: "h2", text: "What is a bid?" },
      {
        type: "p",
        text: "A bid is a buyer’s offer. It includes bid price per unit and the quantity you want. The farmer can then accept or reject.",
      },
      { type: "h2", text: "How ordering works" },
      {
        type: "p",
        text: "Once a bid is accepted, the transaction progresses. Orders help both sides coordinate delivery steps with clarity.",
      },
      { type: "h2", text: "Get started today" },
      {
        type: "p",
        text: "Browse listings as a buyer or create a listing as a farmer. AgriFair is designed to keep the process fair and straightforward.",
      },
    ],
  },
  {
    slug: "best-practices-for-fair-trades",
    title: "Best Practices for Fair Trades on AgriFair",
    excerpt:
      "Practical habits that keep both sides aligned: realistic quantities, clear expectations, and timely decisions.",
    date: "2026-03-06",
    readTime: "4 min read",
    tags: ["Best Practices", "Fairness"],
    seo: {
      keywords: ["fair trades", "best practices", "bid acceptance", "order coordination"],
      summary:
        "Small habits that improve fairness: align bid price with grade, respect available quantity, and respond quickly to accepted offers.",
    },
    content: [
      { type: "h2", text: "Keep quantities realistic" },
      {
        type: "p",
        text: "Bids should match what’s actually available. That reduces cancellations and improves successful order creation.",
      },
      { type: "h2", text: "Agree on price with grade in mind" },
      {
        type: "p",
        text: "Use grade as your quality signal. Bids should be fair for the grade shown on the listing.",
      },
      { type: "h2", text: "Respond quickly" },
      {
        type: "p",
        text: "Fairness also means timing. When bids arrive, respond promptly so the trading process can move forward.",
      },
    ],
  },
];

export function getAllPosts() {
  return POSTS;
}

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

export const ALL_POST_SLUGS = POSTS.map((p) => p.slug);

