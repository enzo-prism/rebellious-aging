-- Create quiz_submissions table
CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar_type TEXT NOT NULL CHECK (pillar_type IN ('confidence', 'style', 'health')),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  challenge TEXT,
  goals TEXT,
  user_email TEXT,
  user_name TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed BOOLEAN DEFAULT FALSE,
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_quiz_submissions_pillar_type ON public.quiz_submissions(pillar_type);
CREATE INDEX idx_quiz_submissions_submitted_at ON public.quiz_submissions(submitted_at DESC);
CREATE INDEX idx_quiz_submissions_reviewed ON public.quiz_submissions(reviewed);

-- Enable Row Level Security
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit a quiz)
CREATE POLICY "Anyone can submit quiz" ON public.quiz_submissions
  FOR INSERT WITH CHECK (true);

-- Admin read access (for viewing submissions)
CREATE POLICY "Admin can view all submissions" ON public.quiz_submissions
  FOR SELECT USING (true);

-- Admin update access (for marking as reviewed and adding notes)  
CREATE POLICY "Admin can update submissions" ON public.quiz_submissions
  FOR UPDATE USING (true);