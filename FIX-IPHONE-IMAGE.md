# FIX LỖI ẢNH TRÊN IPHONE ✅

## ❌ Vấn đề
- iPhone/Safari **KHÔNG hỗ trợ** định dạng ảnh `.avif`
- Android Chrome hỗ trợ nên không lỗi
- Kết quả: Ảnh envelope không hiển thị trên iPhone

---

## ✅ Giải pháp nhanh nhất (5 phút)

### Bước 1: Convert ảnh online

👉 **Truy cập:** https://cloudconvert.com/avif-to-png

1. Click **"Select Files"**
2. Chọn tất cả 6 file trong folder `assets/`:
   - ✅ `envelope-close.avif`
   - ✅ `envelope-flap.avif`
   - ✅ `envelope-open.avif`
   - ✅ `seal.avif`
   - ✅ `flower-left.avif`
   - ✅ `flower-right.avif`

3. Chọn convert sang **PNG**
4. Click **"Start Conversion"**
5. Download file ZIP
6. Giải nén và copy tất cả file `.png` vào folder `assets/`

### Bước 2: Cập nhật code

**Option A: Dùng PowerShell (tự động)**
```powershell
cd "c:\Users\cael.nguyen\Desktop\source wedding\weddingcongtho"
(Get-Content index.html) -replace '\.avif', '.png' | Set-Content index.html
```

**Option B: Find & Replace thủ công**
- Mở `index.html`
- Ctrl+H (Find & Replace)
- Find: `.avif`
- Replace: `.png`
- Replace All

### Bước 3: Test
- Mở website trên iPhone
- Ảnh envelope sẽ hiển thị bình thường ✅

---

## 🚀 Hoặc dùng script tự động (cho người có kinh nghiệm)

```powershell
cd "c:\Users\cael.nguyen\Desktop\source wedding\weddingcongtho"
npm install sharp
node convert-avif-to-png.js
```

Script sẽ:
- ✅ Tự động convert tất cả `.avif` → `.png`
- ✅ Tự động replace trong `index.html`
- ✅ Backup file gốc

---

## 📊 Kết quả

| Trước | Sau |
|-------|-----|
| ❌ iPhone: Không hiển thị ảnh | ✅ iPhone: Hiển thị OK |
| ✅ Android: OK | ✅ Android: OK |
| Format: AVIF (mới, nhẹ) | Format: PNG (support rộng) |
| Dung lượng: 50-100KB | Dung lượng: 200-500KB |

---

## 💡 Lưu ý

- PNG support 100% trình duyệt (kể cả IE11)
- PNG dung lượng lớn hơn AVIF ~3-5 lần
- Chấp nhận được vì chỉ có 6 file ảnh
- Nếu muốn tối ưu hơn nữa, dùng WebP thay vì PNG

---

## 🔧 Troubleshooting

**Q: Vẫn không hiển thị sau khi convert?**
- Clear cache browser: Ctrl+Shift+R
- Check xem file PNG đã copy đúng vào folder `assets/` chưa
- Kiểm tra tên file phải giống hệt (không có space, lowercase)

**Q: Script báo lỗi "Cannot find module 'sharp'"?**
- Chạy: `npm install sharp`
- Nếu vẫn lỗi, dùng cách convert online ở trên
