const templateMailForgotPassword = (resetUrl) => {
  const text = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
            background-color: #008CBA; /* Blue */
            border: none;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            transition-duration: 0.4s;
            cursor: pointer;
          }
          .button:hover {
            background-color: #4CAF50; /* Green */
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Восстановление пароля</h2>
          <p>Вы запросили сброс пароля, пожалуйста, используйте эту ссылку для сброса вашего пароля. Эта ссылка будет действительна только в течение следующего часа.</p>
          <a href="${resetUrl}" class="button">Сбросить пароль</a>
        </div>
      </body>
      </html>`;

  return text;
};

module.exports = templateMailForgotPassword;
