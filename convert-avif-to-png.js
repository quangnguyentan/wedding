const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsFolder = "./assets";
const indexFile = "./index.html";

async function convertAvifToPng() {
  console.log("🔄 Bắt đầu convert ảnh AVIF sang PNG...\n");

  // Get all .avif files
  const files = fs.readdirSync(assetsFolder).filter((f) => f.endsWith(".avif"));

  if (files.length === 0) {
    console.log("❌ Không tìm thấy file .avif nào trong folder assets/");
    return;
  }

  console.log(`📁 Tìm thấy ${files.length} file AVIF:\n`);
  files.forEach((f) => console.log(`   - ${f}`));
  console.log("");

  // Convert each file
  for (const file of files) {
    const inputPath = path.join(assetsFolder, file);
    const outputPath = path.join(assetsFolder, file.replace(".avif", ".png"));

    try {
      await sharp(inputPath).png({quality: 90}).toFile(outputPath);

      console.log(`✅ ${file} → ${file.replace(".avif", ".png")}`);
    } catch (error) {
      console.error(`❌ Lỗi khi convert ${file}:`, error.message);
    }
  }

  console.log("\n🔄 Đang cập nhật index.html...");

  // Update index.html
  try {
    let htmlContent = fs.readFileSync(indexFile, "utf8");
    const originalContent = htmlContent;

    // Replace all .avif with .png
    htmlContent = htmlContent.replace(/\.avif/g, ".png");

    if (htmlContent !== originalContent) {
      // Backup original
      fs.writeFileSync(indexFile + ".backup", originalContent, "utf8");
      console.log("💾 Đã backup file gốc: index.html.backup");

      // Write new content
      fs.writeFileSync(indexFile, htmlContent, "utf8");
      console.log("✅ Đã cập nhật index.html");
    } else {
      console.log("⚠️  Không có thay đổi nào trong index.html");
    }
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật HTML:", error.message);
  }

  console.log("\n✨ HOÀN TẤT! Bạn có thể test trên iPhone ngay.");
  console.log("📱 Nếu muốn giữ cả 2 định dạng, bạn có thể:");
  console.log("   1. Giữ file .avif cho Android (tải nhanh hơn)");
  console.log("   2. Giữ file .png cho iPhone (compatibility)");
  console.log("   3. Dùng <picture> tag để support cả 2\n");
}

// Run
convertAvifToPng().catch(console.error);
