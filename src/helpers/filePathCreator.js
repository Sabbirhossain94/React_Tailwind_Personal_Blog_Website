export const filePathCreator = (file)=> {
    const fileExt = file.name.split(".").pop();
    const filePath = `${file.name}.${fileExt}`;
    return filePath
}