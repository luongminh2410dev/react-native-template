import { log } from "./log";

const getImageExtension = (mimeType: string) => {
  const parts = mimeType.split("/"); // Tách chuỗi thành mảng dựa trên dấu "/"
  if (parts.length === 2) {
    const fileExtension = parts[1]; // Lấy phần tử thứ hai của mảng
    return fileExtension;
  }
  return "";
};
const getFileNameFromPath = (filePath: string) => {
  const pathParts = filePath.split("/");
  const fileName = pathParts[pathParts.length - 1];

  return fileName;
};

const isValidImage = (ext: string) => {
  const validFormat = ["jpg", "jpeg", "png", "gif", "bmp"];
  if (validFormat.includes(ext.toLowerCase())) {
    return true;
  }
  return false;
};
export default { getFileNameFromPath, getImageExtension, isValidImage };
