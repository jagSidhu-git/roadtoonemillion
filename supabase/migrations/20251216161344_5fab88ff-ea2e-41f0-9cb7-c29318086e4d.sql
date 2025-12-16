-- Create a simple counter table
CREATE TABLE public.download_counter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.download_counter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the counter (public page)
CREATE POLICY "Anyone can view download count" 
ON public.download_counter 
FOR SELECT 
USING (true);

-- Insert initial counter row
INSERT INTO public.download_counter (count) VALUES (1247);

-- Create function to increment counter and return new value
CREATE OR REPLACE FUNCTION public.increment_download_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE public.download_counter 
  SET count = count + 1, updated_at = now()
  WHERE id = (SELECT id FROM public.download_counter LIMIT 1)
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;