const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// إعداد رابط Webhook
const DISCORD_WEBHOOK_URL ='https://discord.com/api/webhooks/1302647594891219006/ac_tAXAvFsCSLwsM9CBsOwnZ4-Nzs_iKwsvSm5qv2SP_4KoiCliP1FFLPwkxfjfaKDA8';

// تمكين استقبال JSON
app.use(express.json());

// نقطة استقبال الطلبات
app.post('/send-order', async (req, res) => {
  const { username, userId } = req.body;

  if (!username || !userId) {
    return res.status(400).json({ error: 'اليوزر أو الآيدي مفقود' });
  }

  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: `طلب جديد:\n- **User**: ${username}\n- **ID**: ${userId}`
    });
    res.status(200).json({ message: 'تم إرسال الطلب بنجاح' });
  } catch (error) {
    console.error('خطأ:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إرسال الطلب' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});