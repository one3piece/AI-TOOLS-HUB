-- Seed categories and tags (run after 001_initial_schema.sql)

INSERT INTO categories (slug, name, description, sort_order) VALUES
  ('writing', '写作', 'AI 写作与文案工具', 1),
  ('coding', '编程', '代码辅助与开发工具', 2),
  ('image', '图像', 'AI 图像生成与编辑', 3),
  ('voice', '语音', '语音识别与合成', 4),
  ('productivity', '效率', '效率与自动化工具', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (slug, name) VALUES
  ('chatbot', '对话'),
  ('code-assistant', '代码辅助'),
  ('free', '免费'),
  ('freemium', '免费+付费')
ON CONFLICT (slug) DO NOTHING;

-- Example tool (optional)
INSERT INTO tools (
  slug, name, short_description, description, pros, cons, price_tier, price_note,
  website_url, logo_url, category_id, is_featured, sort_order, published
)
SELECT
  'cursor',
  'Cursor',
  'AI 驱动的代码编辑器，深度集成大模型。',
  'Cursor 是基于 VS Code 的 AI 代码编辑器，支持对话、补全、重构与多文件编辑，适合日常开发与学习。',
  '["智能补全与重构","多文件上下文","对话式编程"]'::jsonb,
  '["需订阅 Pro 获得更多额度"]'::jsonb,
  'freemium',
  'Free 有限额；Pro 约 $20/月',
  'https://cursor.com',
  NULL,
  (SELECT id FROM categories WHERE slug = 'coding' LIMIT 1),
  true,
  0,
  true
WHERE NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cursor');

-- Link Cursor to tags
INSERT INTO tool_tags (tool_id, tag_id)
SELECT t.id, tg.id FROM tools t CROSS JOIN tags tg
WHERE t.slug = 'cursor' AND tg.slug IN ('code-assistant', 'freemium')
ON CONFLICT (tool_id, tag_id) DO NOTHING;

-- Example post
INSERT INTO posts (slug, title, excerpt, content, published, published_at) VALUES (
  'welcome',
  '欢迎使用 AI Tools Hub',
  '本站聚合 AI 工具介绍、优缺点、价格与使用场景，并持续更新资讯。',
  '欢迎来到 AI Tools Hub。我们会持续添加新工具与资讯，你可以通过邮件订阅获取更新。',
  true,
  now()
) ON CONFLICT (slug) DO NOTHING;
