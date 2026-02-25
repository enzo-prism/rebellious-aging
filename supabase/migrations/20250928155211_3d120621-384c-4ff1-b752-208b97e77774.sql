-- Drop the overly permissive SELECT policy that allows public access
DROP POLICY IF EXISTS "Admin can view all submissions" ON public.quiz_submissions;

-- Create a more restrictive policy that only allows authenticated users to view their own submissions
-- Users can only see quiz submissions with their email address
CREATE POLICY "Users can view their own submissions" 
ON public.quiz_submissions 
FOR SELECT 
TO authenticated
USING (user_email = auth.email());

-- Create a separate policy for service role access (for admin functions)
-- This allows server-side operations to access all submissions when using service role
CREATE POLICY "Service role can view all submissions" 
ON public.quiz_submissions 
FOR SELECT 
TO service_role
USING (true);