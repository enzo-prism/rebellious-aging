-- The original UPDATE policy applied to every role. Keep public quiz inserts
-- unchanged, but reserve review-status and reviewer-note updates for the
-- server-side service role.
DROP POLICY IF EXISTS "Admin can update submissions"
ON public.quiz_submissions;

CREATE POLICY "Service role can update submissions"
ON public.quiz_submissions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);
