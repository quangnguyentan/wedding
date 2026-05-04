# Hướng Dẫn Sử Dụng URL Parameter - Dynamic Guest Name

## 🎯 Tính Năng

Giờ bạn chỉ cần **1 source code** nhưng có thể tạo **nhiều thiệp mời khác nhau** cho từng khách mời bằng cách thay đổi URL.

---

## 📝 Cách Sử Dụng

### Format URL:

#### Khi Đang Test Localhost (Live Server):
```
http://127.0.0.1:5500/weddingcongtho/index.html?u=Tên-Người-Nhận
```

Hoặc ngắn gọn hơn:
```
http://127.0.0.1:5500/weddingcongtho/?u=Tên-Người-Nhận
```

#### Khi Deploy Lên Server:
```
https://your-domain.com/?u=Tên-Người-Nhận
```

### Ví Dụ Cụ Thể (Localhost):

#### 1. Mời Bạn Hiền:
```
http://127.0.0.1:5500/weddingcongtho/?u=Bạn-Hiền+❤️
```
**Hiển thị:** "Bạn Hiền ❤️"

#### 2. Mời Bạn An:
```
http://127.0.0.1:5500/weddingcongtho/?u=Bạn-An+❤️
```
**Hiển thị:** "Bạn An ❤️"

#### 3. Mời Anh Tuấn và Chị Mai:
```
http://127.0.0.1:5500/weddingcongtho/?u=Anh-Tuấn-và-Chị-Mai
```
**Hiển thị:** "Anh Tuấn và Chị Mai"

#### 4. Mời Gia Đình Nguyễn Văn A:
```
http://127.0.0.1:5500/weddingcongtho/?u=Gia-Đình-Nguyễn-Văn-A+💕
```
**Hiển thị:** "Gia Đình Nguyễn Văn A 💕"

---

## 🔧 Quy Tắc Viết URL

### 1. Dấu Cách → Dấu Gạch Ngang (-)
```
"Bạn Hiền"  →  Bạn-Hiền
"Anh Tuấn"  →  Anh-Tuấn
```

### 2. Emoji → Dùng Dấu Cộng (+)
```
❤️  →  +❤️
💕  →  +💕
🎉  →  +🎉
```

### 3. Ký Tự Đặc Biệt Tự Động Encode
Trình duyệt sẽ tự động chuyển:
- `❤️` → `%EF%B8%8F`
- Khoảng trắng → `+` hoặc `%20`

---

## 📋 Template Tạo URL Nhanh

Copy template này và thay `TÊN_KHÁCH`:

```
https://your-domain.com/?u=TÊN_KHÁCH+❤️
```

**Ví dụ:**
- `?u=Cô-Hoa+❤️`
- `?u=Chú-Minh+❤️`
- `?u=Anh-Bình-và-Chị-Lan+💐`

---

## 🎁 Ví Dụ Thực Tế

### Danh Sách Khách Mời:

| Khách Mời | URL |
|-----------|-----|
| Bạn Hiền | `?u=Bạn-Hiền+❤️` |
| Bạn An | `?u=Bạn-An+❤️` |
| Cô Lan | `?u=Cô-Lan+💕` |
| Chú Minh | `?u=Chú-Minh+🎉` |
| Anh Tuấn và Chị Mai | `?u=Anh-Tuấn-và-Chị-Mai` |
| Gia Đình Nguyễn Văn A | `?u=Gia-Đình-Nguyễn-Văn-A` |

---

## 💡 Tạo URL Hàng Loạt (Excel/Google Sheets)

### Công Thức Excel:
```excel
="https://your-domain.com/?u=" & SUBSTITUTE(A2, " ", "-") & "+❤️"
```

Trong đó `A2` là ô chứa tên khách.

### Kết Quả:
| A (Tên) | B (URL) |
|---------|---------|
| Bạn Hiền | https://your-domain.com/?u=Bạn-Hiền+❤️ |
| Bạn An | https://your-domain.com/?u=Bạn-An+❤️ |
| Cô Lan | https://your-domain.com/?u=Cô-Lan+❤️ |

---

## 🔍 Test URL

### Bước 1: Mở trình duyệt
### Bước 2: Nhập URL với tham số `?u=`
### Bước 3: Kiểm tra tên hiển thị trong splash screen

**Nếu không có tham số `?u=`, sẽ hiển thị tên mặc định:** "Ban Hiền + ❤️"

---

## 🚨 Lưu Ý Quan Trọng

1. **Dấu gạch ngang (-)** sẽ tự động chuyển thành **khoảng trắng** khi hiển thị
2. **Emoji** có thể dùng bình thường (❤️, 💕, 🎉, 💐, ...)
3. **Không cần encode thủ công** - trình duyệt tự động xử lý
4. **Test trước khi gửi** cho khách để đảm bảo tên hiển thị đúng

---

## 🎨 Customize Thêm

Nếu muốn thay đổi nội dung khác (không chỉ tên), có thể mở rộng:

```javascript
// Trong index.html, thêm vào hàm loadGuestNameFromURL():
const message = urlParams.get('msg');  // Custom message
const date = urlParams.get('date');     // Custom date  
```

---

## ✅ Đã Hoàn Thành

✅ **Music Icon** - Đã fix bằng emoji 🎵/🎶 (không còn lỗi load ảnh)

✅ **Scroll to Top** - Khi mở splash, trang sẽ tự động scroll về đầu

✅ **Dynamic Guest Name** - URL parameter `?u=` để thay đổi tên người nhận

---

**Enjoy your personalized wedding invitations! 💒💕**
