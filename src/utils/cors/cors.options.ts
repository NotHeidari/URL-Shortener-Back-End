const corsConfig = {
  origin: '*', // همه دامنه‌ها مجازند، برای امنیت بهتر مقدار مناسب ست شود
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

export default corsConfig;
