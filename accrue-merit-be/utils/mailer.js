// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || 587),
    secure: false,                  
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

// Hàm gửi mail
const sendLoginSuccessMail = async (userEmail, userName = "") => {

    var htmlBody = ```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Gieo Nhân Lành - Đăng nhập thành công</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color:#F0E6C8;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px; background:#F0E6C8;">
<tr>
<td align="center">

<!-- Container -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#FFF; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1);">

<!-- Header -->
<tr>
<td style="background: linear-gradient(135deg, #C9A84C, #E8C97A); padding:30px; text-align:center; color:#0D0A04;">
    <h1 style="margin:0; font-size:26px;">🌿 Gieo Nhân Lành</h1>
    <p style="margin:8px 0 0; font-size:14px;">Đăng nhập thành công</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px; color:#0D0A04;">

    <h2 style="color:#2E6B48; margin-top:0;">
        Xin chào {{UserName}},
    </h2>

    <p>
        Bạn vừa đăng nhập vào hệ thống <strong>Gieo Nhân Lành</strong>.
    </p>

    <p>
        Mỗi hành động thiện lành hôm nay là một hạt giống tốt cho tương lai 🌱
    </p>

    <!-- Info -->
    <div style="background:#D8C89A; padding:15px; border-radius:8px; margin:20px 0;">
        <p style="margin:5px 0;"><strong>Thời gian:</strong> {{LoginTime}}</p>
        <p style="margin:5px 0;"><strong>Thiết bị:</strong> {{Device}}</p>
    </div>

    <!-- Button -->
    <div style="text-align:center; margin-top:30px;">
        <a href="{{ActionUrl}}" 
           style="background:#2E6B48; color:#FFF; padding:12px 25px; text-decoration:none; border-radius:6px; display:inline-block;">
            Tiếp tục hành trình
        </a>
    </div>

    <p style="margin-top:30px; font-size:14px; color:#7A5E28;">
        Nếu đây không phải bạn, vui lòng đổi mật khẩu ngay để bảo vệ tài khoản.
    </p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="height:2px; background:#C9A84C;"></td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#F0E6C8; padding:20px; text-align:center; font-size:12px; color:#7A5E28;">
    <p style="margin:0;">Gieo Nhân Lành © 2026</p>
    <p style="margin:5px 0 0;">Lan tỏa điều tốt đẹp mỗi ngày 🌿</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
```
;
    try {
        const mailOptions = {
            from: `"${process.env.MAIL_DISPLAY_NAME || 'My App'}" <${process.env.MAIL_USER}>`,
            to: userEmail,
            subject: "Đăng nhập thành công ✓",
            html: htmlBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(` Email login success đã gửi đến: ${userEmail} | MessageId: ${info.messageId}`);
        
        return true;

    } catch (error) {
        console.error(' Gửi email thất bại:', error.message);
        throw error; 
    }
};

module.exports = sendLoginSuccessMail;