import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://yyotopwrnyxxljygymyj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5b3RvcHdybnl4eGxqeWd5bXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNTM2MzgsImV4cCI6MjAxMjYyOTYzOH0.dHtIe_bS--F3CNN1T3SImLVtVdHZPXYoZ86aKXqo0EU',
);
