import supabase, { supabaseUrl } from "./supabase";

export async function uploadFile(file) {
  const imageName = `${Math.random()}-${file.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatar-image/${imageName}`;

  const { error } = await supabase.storage
    .from("avatar-image")
    .upload(imageName, file);

  if (error) {
    console.error(error);
    throw new Error("uploadFile has error");
  }

  return imagePath;
}
