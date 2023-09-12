import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oyayavwuzyfkcueolsrz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YXlhdnd1enlma2N1ZW9sc3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyMzQwMDksImV4cCI6MjAwODgxMDAwOX0.lbTI-aHXkFnjNK0AZK-GAA1gE1fZzm2ffw7mmdvyxYI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
