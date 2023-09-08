
export const addImage = async (image: string, name: string, supabase) => {
    const { data, error } = await supabase.storage.from("images").upload(name, image, {
        cacheControl: "3600",
        upsert: false,
    })

    if (error) return null;

    return data;
}
