// Mock tweet data — serves as the data source for TweetCard components
const tweets = [
  {
    id: 1,
    user: {
      name: "Tenzin Dorji",
      handle: "@tenzin_bt",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    content: "Beautiful morning in Thimphu today! The mountains are stunning 🏔️",
    likes: 42,
    replies: 5,
    reposts: 12,
    timestamp: "2h",
    image: null
  },
  {
    id: 2,
    user: {
      name: "Pema Wangchuk",
      handle: "@pema_dev",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    content: "Just finished my React assignment. Component-based architecture is actually really satisfying once it clicks.",
    likes: 89,
    replies: 14,
    reposts: 23,
    timestamp: "4h",
    image: null
  },
  {
    id: 3,
    user: {
      name: "Karma Yangchen",
      handle: "@karma_y",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    content: "Exploring Punakha Dzong this weekend. History everywhere you look.",
    likes: 156,
    replies: 21,
    reposts: 45,
    timestamp: "6h",
    image: "https://picsum.photos/seed/punakha/600/300"
  },
  {
    id: 4,
    user: {
      name: "Sonam Choden",
      handle: "@sonam_c",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    content: "Anyone else using Vite for their web projects? So much faster than the old tooling.",
    likes: 67,
    replies: 18,
    reposts: 9,
    timestamp: "8h",
    image: null
  },
  {
    id: 5,
    user: {
      name: "Dorji Namgyal",
      handle: "@dorji_ng",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    content: "First time trying archery today. National sport for a reason — incredibly difficult and fun at the same time!",
    likes: 203,
    replies: 37,
    reposts: 61,
    timestamp: "12h",
    image: "https://picsum.photos/seed/archery/600/300"
  }
]

export default tweets