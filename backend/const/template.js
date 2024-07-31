export const forgotPasswordEmailTemplate =({email, otp})=>{
    return `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 10px 0;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333333;
        }
        .content {
          padding: 20px;
          line-height: 1.6;
          color: #333333;
        }
        .button {
          display: block;
          width: 200px;
          margin: 20px auto;
          padding: 10px;
          background-color: #007bff;
          color: #ffffff;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset Your Password</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>We received a request to reset your password for your [Your Service Name] account. If you didn't request this, please ignore this email.</p>
          <p>To reset your password, please click on the link below:</p>
          <a href=${``} class="button">Reset Password</a>
          <p>This link will expire in 24 hours, so be sure to use it soon.</p>
          <p>If you continue to have trouble accessing your account, please contact our support team at [Support Email Address] or visit [Support Website].</p>
        </div>
        <div class="footer">
          <p>Thank you,<br>The Carematics Team</p>
        </div>
      </div>
    </body>
    </html>
    `
  };