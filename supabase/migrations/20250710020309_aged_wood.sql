/*
  # Create reviewers table

  1. New Tables
    - `reviewers`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `subject` (text)
      - `difficulty` (text with check constraint)
      - `price` (integer)
      - `payment_url` (text)
      - `image_url` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `reviewers` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS reviewers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  price integer NOT NULL,
  payment_url text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviewers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to reviewers
CREATE POLICY "Anyone can read reviewers"
  ON reviewers
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update/delete reviewers (for admin)
CREATE POLICY "Authenticated users can manage reviewers"
  ON reviewers
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO reviewers (title, description, subject, difficulty, price, payment_url, image_url) VALUES
  (
    'Complete Math Reviewer for UPCAT',
    'Comprehensive math review covering algebra, geometry, and trigonometry with practice problems.',
    'Practice Sets',
    'Hard',
    299,
    'https://ko-fi.com/s/math-upcat-reviewer',
    '/preview-math.png'
  ),
  (
    'English Grammar Essentials',
    'Master English grammar rules, vocabulary, and reading comprehension for entrance exams.',
    'Practice Sets',
    'Medium',
    199,
    'https://gumroad.com/l/english-grammar-essentials',
    '/preview-english.png'
  ),
  (
    'Filipino Literature and Language',
    'Complete guide to Filipino literature, grammar, and language comprehension for college entrance exams.',
    'Practice Sets',
    'Medium',
    179,
    'https://ko-fi.com/s/filipino-literature-reviewer',
    '/preview-filipino.png'
  ),
  (
    'Logic and Critical Thinking',
    'Develop your logical reasoning and critical thinking skills with comprehensive practice sets.',
    'Practice Sets',
    'Hard',
    249,
    'https://gumroad.com/l/logic-critical-thinking',
    '/preview-logic.png'
  ),
  (
    'Reading Comprehension Mastery',
    'Improve your reading comprehension skills with proven strategies and practice exercises.',
    'Practice Sets',
    'Easy',
    149,
    'https://ko-fi.com/s/reading-comprehension-mastery',
    '/preview-reading.png'
  );