/* ============================================
   FLOATING COMMENT WIDGET JAVASCRIPT
   Add this to your js/main.js file
   Or create a new js/comments.js file
   ============================================ */

// ===================================
// FLOATING COMMENT SYSTEM
// ===================================
function initFloatingComments() {
  const commentStream = document.getElementById("commentStream");
  const commentCount = document.getElementById("commentCount");
  const floatingHearts = document.getElementById("floatingHearts");

  if (!commentStream) return;

  // Fake comment data - Nhiều lời chúc
  const comments = [
    {
      name: "Minh Anh",
      message: "Chúc hai bạn trăm năm hạnh phúc! 💕",
      avatar: "M",
      time: "2 phút trước",
    },
    {
      name: "Tuấn Kiệt",
      message: "Mãi yêu nhau như thuở ban đầu nhé! 🎉",
      avatar: "T",
      time: "5 phút trước",
    },
    {
      name: "Hương Giang",
      message: "Hạnh phúc là được có nhau, chúc mừng cô dâu chú rể! 💐",
      avatar: "H",
      time: "8 phút trước",
    },
    {
      name: "Đức Anh",
      message: "Chúc hai bạn luôn vui vẻ, hạnh phúc bên nhau! 🥰",
      avatar: "D",
      time: "12 phút trước",
    },
    {
      name: "Phương Linh",
      message: "Ước mơ tình yêu đẹp như trong cổ tích! 💖",
      avatar: "P",
      time: "15 phút trước",
    },
    {
      name: "Hoàng Nam",
      message: "Chúc mừng hạnh phúc, yêu thương bền lâu! ❤️",
      avatar: "H",
      time: "20 phút trước",
    },
    {
      name: "Thảo Nguyên",
      message: "Cô dâu chú rể đẹp đôi quá! Chúc nhiều niềm vui! 💞",
      avatar: "T",
      time: "25 phút trước",
    },
    {
      name: "Quang Vinh",
      message: "Mong hai bạn luôn hạnh phúc và thành công! 🎊",
      avatar: "Q",
      time: "30 phút trước",
    },
    {
      name: "Mai Lan",
      message: "Chúc cô dâu chú rể hạnh phúc viên mãn! 💝",
      avatar: "M",
      time: "35 phút trước",
    },
    {
      name: "Anh Tuấn",
      message: "Yêu nhau mãi mãi nha! Chúc mừng 2 bạn! 🥳",
      avatar: "A",
      time: "40 phút trước",
    },
    {
      name: "Thu Hà",
      message: "Hôm nay là ngày đặc biệt nhất, chúc mừng! 💐",
      avatar: "T",
      time: "45 phút trước",
    },
    {
      name: "Bảo Ngọc",
      message: "Chúc hai bạn luôn bên nhau trọn đời! ❤️",
      avatar: "B",
      time: "50 phút trước",
    },
    {
      name: "Minh Đức",
      message: "Hạnh phúc ngập tràn cho 2 bạn nha! 🎉",
      avatar: "M",
      time: "55 phút trước",
    },
    {
      name: "Thanh Hương",
      message: "Mong hai bạn luôn vui vẻ và yêu thương! 💕",
      avatar: "T",
      time: "1 giờ trước",
    },
    {
      name: "Văn Hải",
      message: "Chúc mừng đám cưới! Sống hạnh phúc bên nhau! 💖",
      avatar: "V",
      time: "1 giờ trước",
    },
    {
      name: "Khánh Ly",
      message: "Yêu mãi không đổi thay nha! Chúc mừng! 🌸",
      avatar: "K",
      time: "1 giờ trước",
    },
    {
      name: "Đình Khoa",
      message: "Chúc gia đình mới luôn ấm no hạnh phúc! 🏡",
      avatar: "Đ",
      time: "2 giờ trước",
    },
    {
      name: "Hồng Nhung",
      message: "Mãi yêu nhau như ngày đầu tiên! 💓",
      avatar: "H",
      time: "2 giờ trước",
    },
    {
      name: "Quốc Anh",
      message: "Chúc hai bạn có thật nhiều kỷ niệm đẹp! 🎊",
      avatar: "Q",
      time: "2 giờ trước",
    },
    {
      name: "Lan Anh",
      message: "Hạnh phúc bên nhau đến mãi mãi! 💐",
      avatar: "L",
      time: "3 giờ trước",
    },
    {
      name: "Trung Hiếu",
      message: "Chúc mừng cô dâu chú rể! Luôn vui vẻ nhé! 🎉",
      avatar: "T",
      time: "3 giờ trước",
    },
    {
      name: "Ngọc Ánh",
      message: "Yêu thương và che chở nhau suốt đời! ❤️",
      avatar: "N",
      time: "3 giờ trước",
    },
    {
      name: "Duy Khánh",
      message: "Chúc hai bạn trăm năm hạnh phúc bên nhau! 💕",
      avatar: "D",
      time: "4 giờ trước",
    },
    {
      name: "Phương Anh",
      message: "Mãi yêu bên nhau và luôn hạnh phúc! 💞",
      avatar: "P",
      time: "4 giờ trước",
    },
    {
      name: "Hoàng Long",
      message: "Chúc mừng đám cưới! Nhiều niềm vui nha! 🥳",
      avatar: "H",
      time: "5 giờ trước",
    },
    {
      name: "Thanh Tâm",
      message: "Hạnh phúc trọn đời cùng nhau! 💝",
      avatar: "T",
      time: "5 giờ trước",
    },
    {
      name: "Việt Anh",
      message: "Chúc hai bạn luôn yêu thương và hòa hợp! 🌹",
      avatar: "V",
      time: "6 giờ trước",
    },
    {
      name: "Kim Ngân",
      message: "Yêu nhau mãi mãi! Chúc mừng 2 bạn! 💖",
      avatar: "K",
      time: "6 giờ trước",
    },
  ];

  // Duplicate comments array to create seamless infinite loop
  const allComments = [...comments, ...comments];

  // Update comment count
  if (commentCount) {
    commentCount.textContent = comments.length;
  }

  // Function to create comment element
  function createCommentElement(comment) {
    const commentItem = document.createElement("div");
    commentItem.className = "comment-item";

    commentItem.innerHTML = `
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-content">
                <div class="comment-name">${comment.name}</div>
                <div class="comment-message">${comment.message}</div>
                <div class="comment-time">${comment.time}</div>
            </div>
        `;

    return commentItem;
  }

  // Display all comments (doubled for infinite loop)
  function displayAllComments() {
    allComments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      commentStream.appendChild(commentElement);
    });
  }

  // Initialize display
  displayAllComments();

  // Function to spawn floating heart
  function spawnHeart() {
    if (!floatingHearts) return;

    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💕", "💖", "💗", "💓"][
      Math.floor(Math.random() * 5)
    ];
    heart.style.left = `${Math.random() * 70 + 15}%`;
    heart.style.animationDelay = `${Math.random() * 2}s`;

    floatingHearts.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  // Spawn heart every 3 seconds
  setInterval(spawnHeart, 3000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initFloatingComments();
});
