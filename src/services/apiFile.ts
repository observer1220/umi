import supabase, { supabaseUrl } from "./supabase";

export async function uploadFile(file: any) {
  const imageName = `${Math.random()}-${file.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatar-image/${imageName}`;

  const { error } = await supabase.storage
    .from("avatar-image")
    .upload(imageName, file);

  if (error) {
    throw new Error("uploadFile has error");
  }

  return imagePath;
}
