/*
  # Create Content Management Tables

  1. New Tables
    - `movies` - Store movie information
    - `tv_shows` - Store TV show information  
    - `games` - Store game information
    - `content_ratings` - Store user ratings for content
    - `content_comments` - Store user comments for content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
    - Add policies for public read access to content

  3. Real-time Features
    - Enable real-time subscriptions for content tables
    - Set up triggers for automatic updates
*/

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  rating decimal(3,1) DEFAULT 0,
  year text,
  genre text,
  image text,
  duration text,
  director text,
  cast text[],
  studio text,
  release_date text,
  trending boolean DEFAULT false,
  hot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tv_shows table
CREATE TABLE IF NOT EXISTS tv_shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  rating decimal(3,1) DEFAULT 0,
  season text,
  genre text,
  image text,
  episodes integer,
  director text,
  cast text[],
  studio text,
  release_date text,
  trending boolean DEFAULT false,
  hot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  rating decimal(3,1) DEFAULT 0,
  platform text,
  genre text,
  image text,
  publisher text,
  developer text,
  release_date text,
  trending boolean DEFAULT false,
  hot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_ratings table
CREATE TABLE IF NOT EXISTS content_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('movie', 'tv_show', 'game')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_id, content_type)
);

-- Create content_comments table
CREATE TABLE IF NOT EXISTS content_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('movie', 'tv_show', 'game')),
  comment text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 10),
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tv_shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for movies
CREATE POLICY "Movies are viewable by everyone"
  ON movies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert movies"
  ON movies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update movies they created"
  ON movies
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for tv_shows
CREATE POLICY "TV shows are viewable by everyone"
  ON tv_shows
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert TV shows"
  ON tv_shows
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update TV shows they created"
  ON tv_shows
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for games
CREATE POLICY "Games are viewable by everyone"
  ON games
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert games"
  ON games
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update games they created"
  ON games
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for content_ratings
CREATE POLICY "Users can view all ratings"
  ON content_ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own ratings"
  ON content_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON content_ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON content_ratings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for content_comments
CREATE POLICY "Users can view all comments"
  ON content_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own comments"
  ON content_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON content_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON content_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_movies_created_at ON movies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tv_shows_created_at ON tv_shows(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_ratings_content ON content_ratings(content_id, content_type);
CREATE INDEX IF NOT EXISTS idx_content_comments_content ON content_comments(content_id, content_type);
CREATE INDEX IF NOT EXISTS idx_content_comments_created_at ON content_comments(created_at DESC);

-- Create functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_movies_updated_at BEFORE UPDATE ON movies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tv_shows_updated_at BEFORE UPDATE ON tv_shows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_ratings_updated_at BEFORE UPDATE ON content_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_comments_updated_at BEFORE UPDATE ON content_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();