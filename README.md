# Software Testing Final Exam

## IT-01 (Top-Down with Stub)
- **Real:** การทดสอบระบบ Login ผ่าน Form จริงของหน้าเว็บไซต์
- **Stub:** หลังจาก Login สำเร็จ แทนที่จะใช้หน้า Inventory จริง จะใช้ `page.setContent()` เขียน HTML ขึ้นมาจำลองเป็นหน้าแสดงสินค้า

## IT-02 (Bottom-Up with Driver)
- **Driver:** การใช้ `BrowserContext.addCookies()` กำหนด Cookie session-username เพื่อจำลองสภาวะแวดล้อมว่าผ่านการ Login มาแล้ว
- **Real:** ระบบ Inventory และ Shopping Cart ทำงานจริง โต้ตอบกับข้อมูลสินค้าจริงบนระบบ